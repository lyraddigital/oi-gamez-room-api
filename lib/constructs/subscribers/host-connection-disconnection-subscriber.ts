import { Construct } from "constructs";
import { Effect, PolicyStatement } from "aws-cdk-lib/aws-iam";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction, OutputFormat } from "aws-cdk-lib/aws-lambda-nodejs";
import { join } from "path";

import {
  HandlerFunctionNames,
  HandlerFilePaths,
  EnvironmentVariables,
} from "../../constants";
import { HostConnectionDisconnectionSubscriberProps } from "../../props";

export class HostConnectionDisconnectionSubscriber extends Construct {
  public lambdaFunction: NodejsFunction;

  constructor(
    scope: Construct,
    id: string,
    props: HostConnectionDisconnectionSubscriberProps
  ) {
    super(scope, id);

    this.lambdaFunction = new NodejsFunction(this, "LambdaFunction", {
      runtime: Runtime.NODEJS_18_X,
      handler: HandlerFunctionNames.hostConnectionDisconnectionSubscriber,
      entry: join(
        __dirname,
        HandlerFilePaths.hostConnectionDisconnectionSubscriber
      ),
      bundling: {
        format: OutputFormat.ESM,
      },
      environment: {
        [EnvironmentVariables.hostConnectionDisconnectionSubscriber
          .connectionTableName]: props.connectionTable.tableName,
      },
    });

    const connectionTablePolicyDocument = new PolicyStatement({
      effect: Effect.ALLOW,
      resources: [props.connectionTable.tableArn],
      actions: ["dynamodb:DeleteItem"],
    });

    this.lambdaFunction.addToRolePolicy(connectionTablePolicyDocument);
  }
}
