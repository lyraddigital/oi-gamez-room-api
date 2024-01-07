import { Construct } from "constructs";
import { Effect, PolicyStatement } from "aws-cdk-lib/aws-iam";

import {
  EnvironmentVariables,
  HandlerFilePaths,
  HandlerFunctionNames,
} from "../../constants";
import { CreateRoomLambdaProps } from "../../props";

import { RestAPIHandlerFunction } from "./rest-api-handler-function";

export class CreateRoomLambda extends Construct {
  constructor(scope: Construct, id: string, props: CreateRoomLambdaProps) {
    super(scope, id);

    const createRoomLambda = new RestAPIHandlerFunction(this, "RestAPI", {
      handlerFileLocation: HandlerFilePaths.createRoom,
      handlerFunctionName: HandlerFunctionNames.createRoom,
      method: "POST",
      resource: props.resource,
      environment: {
        [EnvironmentVariables.createRoom.tableName]: props.table.tableName,
        [EnvironmentVariables.createRoom.corsAllowedOrigins]:
          props.allowedOrigins,
        [EnvironmentVariables.createRoom.sessionCookieName]:
          props.sessionCookieName,
        [EnvironmentVariables.createRoom.sessionCookieDomain]:
          props.sessionCookieDomain,
      },
    });

    const dbTablePolicyDocument = new PolicyStatement({
      effect: Effect.ALLOW,
      resources: [props.table.tableArn],
      actions: [
        "dynamodb:Query",
        "dynamodb:GetItem",
        "dynamodb:PutItem",
        "dynamodb:UpdateItem",
      ],
    });

    createRoomLambda.lambdaFunction.addToRolePolicy(dbTablePolicyDocument);
  }
}