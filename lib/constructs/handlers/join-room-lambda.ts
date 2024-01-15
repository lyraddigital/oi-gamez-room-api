import { Construct } from "constructs";
import { Effect, PolicyStatement } from "aws-cdk-lib/aws-iam";

import {
  EnvironmentVariables,
  HandlerFilePaths,
  HandlerFunctionNames,
} from "../../constants";
import { JoinRoomLambdaProps } from "../../props";

import { RestAPIHandlerFunction } from "./rest-api-handler-function";

export class JoinRoomLambda extends Construct {
  constructor(scope: Construct, id: string, props: JoinRoomLambdaProps) {
    super(scope, id);

    const joinRoomLambda = new RestAPIHandlerFunction(this, "RestAPI", {
      handlerFileLocation: HandlerFilePaths.joinRoom,
      handlerFunctionName: HandlerFunctionNames.joinRoom,
      method: "PUT",
      resource: props.resource,
      environment: {
        [EnvironmentVariables.joinRoom.tableName]: props.table.tableName,
        [EnvironmentVariables.joinRoom.corsAllowedOrigins]:
          props.allowedOrigins,
      },
    });

    const dbTablePolicyDocument = new PolicyStatement({
      effect: Effect.ALLOW,
      resources: [props.table.tableArn],
      actions: ["dynamodb:Query", "dynamodb:PutItem"],
    });

    joinRoomLambda.lambdaFunction.addToRolePolicy(dbTablePolicyDocument);
  }
}
