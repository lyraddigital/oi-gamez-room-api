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
      method: "GET",
      resource: props.resource,
      environment: {
        [EnvironmentVariables.getGameTypes.tableName]: props.table.tableName,
        [EnvironmentVariables.getGameTypes.corsAllowedOrigins]:
          props.allowedOrigins,
      },
    });

    const dbTablePolicyDocument = new PolicyStatement({
      effect: Effect.ALLOW,
      resources: [props.table.tableArn],
      actions: ["dynamodb:Query"],
    });

    createRoomLambda.lambdaFunction.addToRolePolicy(dbTablePolicyDocument);
  }
}
