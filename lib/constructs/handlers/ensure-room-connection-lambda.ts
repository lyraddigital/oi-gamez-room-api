import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";

import {
  EnvironmentVariables,
  HandlerFilePaths,
  HandlerFunctionNames,
} from "../../constants";
import { EnsureRoomConnectionLambdaProps } from "../../props";

import { WebsocketAPIHandlerFunction } from "./websocket-api-handler-function";
import { Effect, PolicyStatement } from "aws-cdk-lib/aws-iam";

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
            props.eventBus.eventBusName,
          [EnvironmentVariables.ensureRoomConnection.ebEventSourceName]:
            props.ebEventSourceName,
        },
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
      actions: ["dynamodb:GetItem", "dynamodb:PutItem"],
    });

    const ebPutEventsPolicyDocument = new PolicyStatement({
      effect: Effect.ALLOW,
      resources: [props.eventBus.eventBusArn],
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

    this.lambdaFunction = ensureRoomConnectionHandlerFunction.lambdaFunction;
  }
}
