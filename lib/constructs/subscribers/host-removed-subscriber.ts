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
import { HostRemovedSubscriberProps } from "../../props";

export class HostRemovedSubscriber extends Construct {
  public lambdaFunction: NodejsFunction;

  constructor(scope: Construct, id: string, props: HostRemovedSubscriberProps) {
    super(scope, id);

    this.lambdaFunction = new NodejsFunction(this, "LambdaFunction", {
      runtime: Runtime.NODEJS_18_X,
      handler: HandlerFunctionNames.hostRemovedSubscriber,
      entry: join(__dirname, HandlerFilePaths.hostRemovedSubscriber),
      bundling: {
        format: OutputFormat.ESM,
      },
      environment: {
        [EnvironmentVariables.hostRemovedSubscriber.tableName]:
          props.table.tableName,
        [EnvironmentVariables.hostRemovedSubscriber.connectionTableName]:
          props.connectionTable.tableName,
      },
    });

    const tablePolicyDocument = new PolicyStatement({
      effect: Effect.ALLOW,
      resources: [props.table.tableArn],
      actions: ["dynamodb:DeleteItem", "dynamodb:UpdateItem"],
    });

    const connectionTablePolicyDocument = new PolicyStatement({
      effect: Effect.ALLOW,
      resources: [props.connectionTable.tableArn],
      actions: ["dynamodb:Query", "dynamodb:DeleteItem"],
    });

    this.lambdaFunction.addToRolePolicy(tablePolicyDocument);
    this.lambdaFunction.addToRolePolicy(connectionTablePolicyDocument);
  }
}
