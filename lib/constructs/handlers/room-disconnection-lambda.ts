import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";

import {
  EnvironmentVariables,
  HandlerFilePaths,
  HandlerFunctionNames,
} from "../../constants";
import { RoomDisconnectionLambdaProps } from "../../props";

import { WebsocketAPIHandlerFunction } from "./websocket-api-handler-function";
import { Effect, PolicyStatement } from "aws-cdk-lib/aws-iam";

export class RoomDisconnectionLambda extends Construct {
  public lambdaFunction: NodejsFunction;

  constructor(
    scope: Construct,
    id: string,
    props: RoomDisconnectionLambdaProps
  ) {
    super(scope, id);

    const roomDisconnectionHandlerFunction = new WebsocketAPIHandlerFunction(
      this,
      "RoomDisconnectionHandlerFunction",
      {
        handlerFileLocation: HandlerFilePaths.roomDisconnection,
        handlerFunctionName: HandlerFunctionNames.roomDisconnection,
        environment: {
          [EnvironmentVariables.roomDisconnection.connectionTableName]:
            props.connectionTable.tableName,
          [EnvironmentVariables.roomDisconnection.connectionIndexName]:
            props.connectionTableIndexName,
        },
      }
    );

    const connectionTablePolicyDocument = new PolicyStatement({
      effect: Effect.ALLOW,
      resources: [props.connectionTable.tableArn],
      actions: ["dynamodb:UpdateItem"],
    });

    const connectionIndexPolicyDocument = new PolicyStatement({
      effect: Effect.ALLOW,
      resources: [
        `${props.connectionTable.tableArn}/index/${props.connectionTableIndexName}`,
      ],
      actions: ["dynamodb:Query"],
    });

    roomDisconnectionHandlerFunction.lambdaFunction.addToRolePolicy(
      connectionTablePolicyDocument
    );

    roomDisconnectionHandlerFunction.lambdaFunction.addToRolePolicy(
      connectionIndexPolicyDocument
    );

    this.lambdaFunction = roomDisconnectionHandlerFunction.lambdaFunction;
  }
}
