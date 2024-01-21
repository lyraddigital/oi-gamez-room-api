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
import { UserConnectionDisconnectionSubscriberProps } from "../../props";

export class UserConnectionDisconnectionSubscriber extends Construct {
  public lambdaFunction: NodejsFunction;

  constructor(
    scope: Construct,
    id: string,
    props: UserConnectionDisconnectionSubscriberProps
  ) {
    super(scope, id);

    this.lambdaFunction = new NodejsFunction(this, "LambdaFunction", {
      runtime: Runtime.NODEJS_18_X,
      handler: HandlerFunctionNames.userConnectionDisconnectionSubscriber,
      entry: join(
        __dirname,
        HandlerFilePaths.userConnectionDisconnectionSubscriber
      ),
      bundling: {
        format: OutputFormat.ESM,
      },
      environment: {
        [EnvironmentVariables.userConnectionDisconnectionSubscriber.tableName]:
          props.table.tableName,
        [EnvironmentVariables.userConnectionDisconnectionSubscriber
          .connectionTableName]: props.connectionTable.tableName,
      },
    });

    const tablePolicyDocument = new PolicyStatement({
      effect: Effect.ALLOW,
      resources: [props.table.tableArn],
      actions: ["dynamodb:UpdateItem"],
    });

    const connectionTablePolicyDocument = new PolicyStatement({
      effect: Effect.ALLOW,
      resources: [props.connectionTable.tableArn],
      actions: ["dynamodb:DeleteItem"],
    });

    this.lambdaFunction.addToRolePolicy(tablePolicyDocument);
    this.lambdaFunction.addToRolePolicy(connectionTablePolicyDocument);
  }
}
