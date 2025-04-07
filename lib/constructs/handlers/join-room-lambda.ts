import { Construct } from "constructs";
import { Effect, PolicyStatement } from "aws-cdk-lib/aws-iam";

import {
  EnvironmentVariables,
  ExternalLibraries,
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
        [EnvironmentVariables.joinRoom.connectionTableName]:
          props.connectionTable.tableName,
        [EnvironmentVariables.joinRoom.corsAllowedOrigins]:
          props.allowedOrigins,
        [EnvironmentVariables.joinRoom.encryptionKey]: props.encryptionKey,
        [EnvironmentVariables.joinRoom.encryptionIV]: props.encryptionIV,
        [EnvironmentVariables.joinRoom.jwtSecretKey]: props.jwtSecretKey,
        [EnvironmentVariables.joinRoom.jwtExpiryInMinutes]:
          props.jwtExpiryInMinutes.toString(),
      },
      layers: props.layers || [],
    });

    const dbTablePolicyDocument = new PolicyStatement({
      effect: Effect.ALLOW,
      resources: [props.table.tableArn],
      actions: ["dynamodb:Query", "dynamodb:PutItem"],
    });

    const dbConnectionTablePolicyDocument = new PolicyStatement({
      effect: Effect.ALLOW,
      resources: [props.connectionTable.tableArn],
      actions: ["dynamodb:Query"],
    });

    joinRoomLambda.lambdaFunction.addToRolePolicy(dbTablePolicyDocument);
    joinRoomLambda.lambdaFunction.addToRolePolicy(
      dbConnectionTablePolicyDocument
    );
  }
}
