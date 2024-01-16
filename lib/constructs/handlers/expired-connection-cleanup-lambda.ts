import { Duration, aws_events_targets } from "aws-cdk-lib";
import { Rule, Schedule } from "aws-cdk-lib/aws-events";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction, OutputFormat } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { join } from "path";

import { ExpiredConnectionCleanupLambdaProps } from "../../props";
import {
  HandlerFunctionNames,
  HandlerFilePaths,
  EnvironmentVariables,
} from "../../constants";

export class ExpiredConnectionCleanupLambda extends Construct {
  constructor(
    scope: Construct,
    id: string,
    props: ExpiredConnectionCleanupLambdaProps
  ) {
    super(scope, id);

    const lambdaFunction = new NodejsFunction(this, "LambdaFunction", {
      runtime: Runtime.NODEJS_18_X,
      handler: HandlerFunctionNames.expiredConnectionCleanup,
      entry: join(__dirname, HandlerFilePaths.expiredConnectionCleanup),
      environment: {
        [EnvironmentVariables.expiredConnectionCleanup.tableName]:
          props.table.tableName,
        [EnvironmentVariables.expiredConnectionCleanup.connectionTableName]:
          props.connectionTable.tableName,
        [EnvironmentVariables.expiredConnectionCleanup.connectionIndexName]:
          props.connectionIndexName,
      },
      bundling: {
        format: OutputFormat.ESM,
      },
    });

    new Rule(this, "ExpiredConnectionRule", {
      description:
        "Rule that clears out expired connections and potentially any rooms associated to it.",
      targets: [new aws_events_targets.LambdaFunction(lambdaFunction)],
      schedule: Schedule.rate(Duration.minutes(1)),
    });
  }
}
