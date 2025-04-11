import { Construct } from "constructs";
import { Effect, PolicyStatement } from "aws-cdk-lib/aws-iam";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction, OutputFormat } from "aws-cdk-lib/aws-lambda-nodejs";
import { join } from "path";

import {
  HandlerFunctionNames,
  HandlerFilePaths,
  EnvironmentVariables,
  ExternalLibraries,
} from "../../../constants/index.js";
import { HostExpiredSubscriberProps } from "../../../props/index.js";

export class HostExpiredSubscriber extends Construct {
  public lambdaFunction: NodejsFunction;

  constructor(scope: Construct, id: string, props: HostExpiredSubscriberProps) {
    super(scope, id);

    this.lambdaFunction = new NodejsFunction(this, "LambdaFunction", {
      runtime: Runtime.NODEJS_20_X,
      handler: HandlerFunctionNames.hostExpiredSubscriber,
      entry: join(__dirname, HandlerFilePaths.hostExpiredSubscriber),
      bundling: {
        format: OutputFormat.ESM,
        externalModules: ExternalLibraries.getAllExternalLibraries(),
      },
      environment: {
        [EnvironmentVariables.hostExpiredSubscriber.tableName]:
          props.table.tableName,
        [EnvironmentVariables.hostExpiredSubscriber.connectionTableName]:
          props.connectionTable.tableName,
        [EnvironmentVariables.hostExpiredSubscriber.eventBusName]:
          props.roomEventBus.eventBusName,
        [EnvironmentVariables.hostExpiredSubscriber.eventBusEventSourceName]:
          props.eventBusEventSourceName,
      },
      layers: props.layers,
    });

    const tablePolicyDocument = new PolicyStatement({
      effect: Effect.ALLOW,
      resources: [props.table.tableArn],
      actions: ["dynamodb:DeleteItem", "dynamodb:Query", "dynamodb:UpdateItem"],
    });

    const connectionTablePolicyDocument = new PolicyStatement({
      effect: Effect.ALLOW,
      resources: [props.connectionTable.tableArn],
      actions: ["dynamodb:Query", "dynamodb:DeleteItem"],
    });

    const ebPutEventsPolicyDocument = new PolicyStatement({
      effect: Effect.ALLOW,
      resources: [props.roomEventBus.eventBusArn],
      actions: ["events:PutEvents"],
    });

    this.lambdaFunction.addToRolePolicy(tablePolicyDocument);
    this.lambdaFunction.addToRolePolicy(connectionTablePolicyDocument);
    this.lambdaFunction.addToRolePolicy(ebPutEventsPolicyDocument);
  }
}
