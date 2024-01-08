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
          [EnvironmentVariables.ensureRoomConnection.tableName]:
            props.table.tableName,
        },
      }
    );

    const dbTablePolicyDocument = new PolicyStatement({
      effect: Effect.ALLOW,
      resources: [props.table.tableArn],
      actions: ["dynamodb:Query"],
    });

    ensureRoomConnectionHandlerFunction.lambdaFunction.addToRolePolicy(
      dbTablePolicyDocument
    );

    this.lambdaFunction = ensureRoomConnectionHandlerFunction.lambdaFunction;
  }
}
