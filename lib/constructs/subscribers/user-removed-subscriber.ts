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
import { UserRemovedSubscriberProps } from "../../props";

export class UserRemovedSubscriber extends Construct {
  public lambdaFunction: NodejsFunction;

  constructor(scope: Construct, id: string, props: UserRemovedSubscriberProps) {
    super(scope, id);

    this.lambdaFunction = new NodejsFunction(this, "LambdaFunction", {
      runtime: Runtime.NODEJS_18_X,
      handler: HandlerFunctionNames.userRemovedSubscriber,
      entry: join(__dirname, HandlerFilePaths.userRemovedSubscriber),
      bundling: {
        format: OutputFormat.ESM,
      },
      environment: {
        [EnvironmentVariables.userRemovedSubscriber.tableName]:
          props.table.tableName,
        [EnvironmentVariables.userRemovedSubscriber.connectionTableName]:
          props.connectionTable.tableName,
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
