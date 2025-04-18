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
import { RoomRemovedSubscriberProps } from "../../../props/index.js";

export class RoomRemovedSubscriber extends Construct {
  public lambdaFunction: NodejsFunction;

  constructor(scope: Construct, id: string, props: RoomRemovedSubscriberProps) {
    super(scope, id);

    this.lambdaFunction = new NodejsFunction(this, "LambdaFunction", {
      runtime: Runtime.NODEJS_20_X,
      handler: HandlerFunctionNames.roomRemovedSubscriber,
      entry: join(__dirname, HandlerFilePaths.roomRemovedSubscriber),
      bundling: {
        format: OutputFormat.ESM,
        externalModules: ExternalLibraries.getAllExternalLibraries(),
      },
      environment: {
        [EnvironmentVariables.roomRemovedSubscriber.connectionTableName]:
          props.connectionTable.tableName,
        [EnvironmentVariables.roomRemovedSubscriber.roomSocketApiEndpoint]:
          props.roomSocketApiEndpoint,
        [EnvironmentVariables.roomRemovedSubscriber.externalEventBusName]:
          props.externalEventBus.eventBusName,
        [EnvironmentVariables.roomRemovedSubscriber
          .externalEventBusEventSourceName]:
          props.externalEventBusEventSourceName,
      },
      layers: props.layers,
    });

    const connectionTablePolicyDocument = new PolicyStatement({
      effect: Effect.ALLOW,
      resources: [props.connectionTable.tableArn],
      actions: ["dynamodb:Query"],
    });

    const webSocketApiPostPolicyDocument = new PolicyStatement({
      effect: Effect.ALLOW,
      resources: [
        props.roomWebsocketApiPostArn,
        props.roomWebsocketApiDeleteArn,
      ],
      actions: ["execute-api:ManageConnections"],
    });

    const ebPutEventsPolicyDocument = new PolicyStatement({
      effect: Effect.ALLOW,
      resources: [props.externalEventBus.eventBusArn],
      actions: ["events:PutEvents"],
    });

    this.lambdaFunction.addToRolePolicy(connectionTablePolicyDocument);
    this.lambdaFunction.addToRolePolicy(webSocketApiPostPolicyDocument);
    this.lambdaFunction.addToRolePolicy(ebPutEventsPolicyDocument);
  }
}
