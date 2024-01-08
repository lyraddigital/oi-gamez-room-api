import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";

import {
  EnvironmentVariables,
  HandlerFilePaths,
  HandlerFunctionNames,
} from "../../constants";
import { EnsureRoomConnectionLambdaProps } from "../../props";

import { WebsocketAPIHandlerFunction } from "./websocket-api-handler-function";

export class EnsureRoomConnectionLambda extends Construct {
  public lambdaFunction: NodejsFunction;

  constructor(
    scope: Construct,
    id: string,
    props: EnsureRoomConnectionLambdaProps
  ) {
    super(scope, id);

    const connectToHandlerFunction = new WebsocketAPIHandlerFunction(
      this,
      "ConnectToHandlerFunction",
      {
        handlerFileLocation: HandlerFilePaths.ensureRoomConnection,
        handlerFunctionName: HandlerFunctionNames.ensureRoomConnection,
        environment: {
          [EnvironmentVariables.ensureRoomConnection.tableName]:
            props.table.tableName,
        },
      }
    );

    this.lambdaFunction = connectToHandlerFunction.lambdaFunction;
  }
}
