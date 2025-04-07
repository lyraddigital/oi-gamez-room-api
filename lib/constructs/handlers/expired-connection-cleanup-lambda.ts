import { Duration, aws_events_targets } from "aws-cdk-lib";
import { Effect, PolicyStatement } from "aws-cdk-lib/aws-iam";
import { Rule, Schedule } from "aws-cdk-lib/aws-events";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction, OutputFormat } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { join } from "path";

import {
  HandlerFunctionNames,
  HandlerFilePaths,
  EnvironmentVariables,
  ExternalLibraries,
} from "../../constants";
import { ExpiredConnectionCleanupLambdaProps } from "../../props";

export class ExpiredConnectionCleanupLambda extends Construct {
  constructor(
    scope: Construct,
    id: string,
    props: ExpiredConnectionCleanupLambdaProps
  ) {
    super(scope, id);

    const lambdaFunction = new NodejsFunction(this, "LambdaFunction", {
      runtime: Runtime.NODEJS_20_X,
      handler: HandlerFunctionNames.expiredConnectionCleanup,
      entry: join(__dirname, HandlerFilePaths.expiredConnectionCleanup),
      environment: {
        [EnvironmentVariables.expiredConnectionCleanup.tableName]:
          props.table.tableName,
        [EnvironmentVariables.expiredConnectionCleanup.connectionTableName]:
          props.connectionTable.tableName,
        [EnvironmentVariables.expiredConnectionCleanup
          .lastDisconnectedIndexName]: props.lastDisconnectedIndexName,
        [EnvironmentVariables.expiredConnectionCleanup
          .expiredDisconnectionWindowInSeconds]:
          props.expiredDisconnectionWindowInSeconds.toString(),
        [EnvironmentVariables.expiredConnectionCleanup.eventBusName]:
          props.roomEventBus.eventBusName,
        [EnvironmentVariables.expiredConnectionCleanup.eventBusEventSourceName]:
          props.eventBusEventSourceName,
      },
      bundling: {
        format: OutputFormat.ESM,
        externalModules: ExternalLibraries.getAllExternalLibraries(),
      },
    });

    const dbConnectionTablePolicyDocument = new PolicyStatement({
      effect: Effect.ALLOW,
      resources: [props.connectionTable.tableArn],
      actions: ["dynamodb:Scan"],
    });

    const dbTablePolicyDocument = new PolicyStatement({
      effect: Effect.ALLOW,
      resources: [props.table.tableArn],
      actions: ["dynamodb:BatchGetItem"],
    });

    const ebPutEventsPolicyDocument = new PolicyStatement({
      effect: Effect.ALLOW,
      resources: [props.roomEventBus.eventBusArn],
      actions: ["events:PutEvents"],
    });

    lambdaFunction.addToRolePolicy(dbConnectionTablePolicyDocument);
    lambdaFunction.addToRolePolicy(dbTablePolicyDocument);
    lambdaFunction.addToRolePolicy(ebPutEventsPolicyDocument);

    new Rule(this, "ExpiredConnectionRule", {
      description:
        "Rule that clears out expired connections and potentially any rooms associated to it.",
      targets: [new aws_events_targets.LambdaFunction(lambdaFunction)],
      schedule: Schedule.rate(Duration.minutes(1)),
    });
  }
}
