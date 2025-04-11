import { Construct } from "constructs";
import { Effect, PolicyStatement } from "aws-cdk-lib/aws-iam";

import {
  EnvironmentVariables,
  HandlerFilePaths,
  HandlerFunctionNames,
} from "../../constants/index.js";
import { GetRoomStatusLambdaProps } from "../../props/index.js";

import { RestAPIHandlerFunction } from "./rest-api-handler-function.js";

export class GetRoomStatusLambda extends Construct {
  constructor(scope: Construct, id: string, props: GetRoomStatusLambdaProps) {
    super(scope, id);

    const joinRoomLambda = new RestAPIHandlerFunction(this, "RestAPI", {
      handlerFileLocation: HandlerFilePaths.getRoomStatus,
      handlerFunctionName: HandlerFunctionNames.getRoomStatus,
      method: "GET",
      resource: props.resource,
      environment: {
        [EnvironmentVariables.getRoomStatus.tableName]: props.table.tableName,
        [EnvironmentVariables.getRoomStatus.corsAllowedOrigins]:
          props.allowedOrigins,
      },
      layers: props.layers || [],
    });

    const dbTablePolicyDocument = new PolicyStatement({
      effect: Effect.ALLOW,
      resources: [props.table.tableArn],
      actions: ["dynamodb:Query"],
    });

    joinRoomLambda.lambdaFunction.addToRolePolicy(dbTablePolicyDocument);
  }
}
