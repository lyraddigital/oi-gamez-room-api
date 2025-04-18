import { Effect, PolicyStatement } from "aws-cdk-lib/aws-iam";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";

import {
  EnvironmentVariables,
  HandlerFilePaths,
  HandlerFunctionNames,
} from "../../constants/index.js";
import { EnsureRoomConnectionLambdaProps } from "../../props/index.js";

import { WebsocketAPIHandlerFunction } from "./websocket-api-handler-function.js";

export class EnsureRoomConnectionLambda extends Construct {
  public lambdaFunction: NodejsFunction;

  constructor(
    scope: Construct,
    id: string,
    props: EnsureRoomConnectionLambdaProps
  ) {
    super(scope, id);

    const ensureRoomConnectionHandlerFunction = new WebsocketAPIHandlerFunction(
      this,
      "EnsureRoomConnectionHandlerFunction",
      {
        handlerFileLocation: HandlerFilePaths.ensureRoomConnection,
        handlerFunctionName: HandlerFunctionNames.ensureRoomConnection,
        environment: {
          [EnvironmentVariables.ensureRoomConnection.connectionTableName]:
            props.connectionTable.tableName,
          [EnvironmentVariables.ensureRoomConnection.roomTableName]:
            props.roomTable.tableName,
          [EnvironmentVariables.ensureRoomConnection.updatedConnectionWindow]:
            props.updatedConnectWindowInSeconds.toString(),
          [EnvironmentVariables.ensureRoomConnection.eventBusName]:
            props.roomEventBus.eventBusName,
          [EnvironmentVariables.ensureRoomConnection.eventBusEventSourceName]:
            props.eventBusEventSourceName,
          [EnvironmentVariables.ensureRoomConnection.externalEventBusName]:
            props.roomExternalEventBus.eventBusName,
          [EnvironmentVariables.ensureRoomConnection
            .externalEventBusEventSourceName]:
            props.roomExternalEventBusSourceName,
        },
        layers: props.layers,
      }
    );

    const roomTablePolicyDocument = new PolicyStatement({
      effect: Effect.ALLOW,
      resources: [props.roomTable.tableArn],
      actions: ["dynamodb:Query", "dynamodb:UpdateItem"],
    });

    const connectionTablePolicyDocument = new PolicyStatement({
      effect: Effect.ALLOW,
      resources: [props.connectionTable.tableArn],
      actions: ["dynamodb:GetItem", "dynamodb:PutItem", "dynamodb:Query"],
    });

    const ebPutEventsPolicyDocument = new PolicyStatement({
      effect: Effect.ALLOW,
      resources: [props.roomEventBus.eventBusArn],
      actions: ["events:PutEvents"],
    });

    const externalEbPutEventsPolicyDocument = new PolicyStatement({
      effect: Effect.ALLOW,
      resources: [props.roomExternalEventBus.eventBusArn],
      actions: ["events:PutEvents"],
    });

    ensureRoomConnectionHandlerFunction.lambdaFunction.addToRolePolicy(
      roomTablePolicyDocument
    );

    ensureRoomConnectionHandlerFunction.lambdaFunction.addToRolePolicy(
      connectionTablePolicyDocument
    );

    ensureRoomConnectionHandlerFunction.lambdaFunction.addToRolePolicy(
      ebPutEventsPolicyDocument
    );

    ensureRoomConnectionHandlerFunction.lambdaFunction.addToRolePolicy(
      externalEbPutEventsPolicyDocument
    );

    this.lambdaFunction = ensureRoomConnectionHandlerFunction.lambdaFunction;
  }
}
