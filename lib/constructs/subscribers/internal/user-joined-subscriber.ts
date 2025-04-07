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
} from "../../../constants";
import { UserJoinedSubscriberProps } from "../../../props";

export class UserJoinedSubscriber extends Construct {
  public lambdaFunction: NodejsFunction;

  constructor(scope: Construct, id: string, props: UserJoinedSubscriberProps) {
    super(scope, id);

    this.lambdaFunction = new NodejsFunction(this, "LambdaFunction", {
      runtime: Runtime.NODEJS_20_X,
      handler: HandlerFunctionNames.userJoinedSubscriber,
      entry: join(__dirname, HandlerFilePaths.userJoinedSubscriber),
      bundling: {
        format: OutputFormat.ESM,
        externalModules: ExternalLibraries.getAllExternalLibraries(),
      },
      environment: {
        [EnvironmentVariables.userJoinedSubscriber.tableName]:
          props.table.tableName,
        [EnvironmentVariables.userJoinedSubscriber.connectionTableName]:
          props.connectionTable.tableName,
        [EnvironmentVariables.userJoinedSubscriber.roomSocketApiEndpoint]:
          props.roomSocketApiEndpoint,
        [EnvironmentVariables.userJoinedSubscriber.externalEventBusName]:
          props.externalEventBus.eventBusName,
        [EnvironmentVariables.userJoinedSubscriber
          .externalEventBusEventSourceName]:
          props.externalEventBusEventSourceName,
      },
      layers: props.layers,
    });

    const tablePolicyDocument = new PolicyStatement({
      effect: Effect.ALLOW,
      resources: [props.table.tableArn],
      actions: ["dynamodb:Query"],
    });

    const connectionTablePolicyDocument = new PolicyStatement({
      effect: Effect.ALLOW,
      resources: [props.connectionTable.tableArn],
      actions: ["dynamodb:Query"],
    });

    const webSocketApiPostPolicyDocument = new PolicyStatement({
      effect: Effect.ALLOW,
      resources: [props.roomWebsocketApiPostArn],
      actions: ["execute-api:ManageConnections"],
    });

    const ebPutEventsPolicyDocument = new PolicyStatement({
      effect: Effect.ALLOW,
      resources: [props.externalEventBus.eventBusArn],
      actions: ["events:PutEvents"],
    });

    this.lambdaFunction.addToRolePolicy(tablePolicyDocument);
    this.lambdaFunction.addToRolePolicy(connectionTablePolicyDocument);
    this.lambdaFunction.addToRolePolicy(webSocketApiPostPolicyDocument);
    this.lambdaFunction.addToRolePolicy(ebPutEventsPolicyDocument);
  }
}
