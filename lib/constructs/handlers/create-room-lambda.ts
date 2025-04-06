import { Construct } from "constructs";
import { Effect, PolicyStatement } from "aws-cdk-lib/aws-iam";

import {
  EnvironmentVariables,
  ExternalLibraries,
  HandlerFilePaths,
  HandlerFunctionNames,
  IndexNames,
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
        [EnvironmentVariables.createRoom.hostRoomIndexName]:
          props.hostRoomIndexName,
        [EnvironmentVariables.createRoom.connectWindowInSeconds]:
          props.connectWindowInSeconds.toString(),
        [EnvironmentVariables.createRoom.encryptionKey]: props.encryptionKey,
        [EnvironmentVariables.createRoom.encryptionIV]: props.encryptionIV,
        [EnvironmentVariables.createRoom.jwtSecretKey]: props.jwtSecretKey,
        [EnvironmentVariables.createRoom.jwtExpiryInMinutes]:
          props.jwtExpiryInMinutes.toString(),
      },
      externalModules: [
        ExternalLibraries.oiGamezCore,
        ExternalLibraries.oiGamezHttp,
      ],
      layers: props.layers || [],
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

    const dbHostRoomIndexPolicyDocument = new PolicyStatement({
      effect: Effect.ALLOW,
      resources: [`${props.table.tableArn}/index/${IndexNames.hostedRooms}`],
      actions: ["dynamodb:Query"],
    });

    createRoomLambda.lambdaFunction.addToRolePolicy(dbTablePolicyDocument);
    createRoomLambda.lambdaFunction.addToRolePolicy(
      dbHostRoomIndexPolicyDocument
    );
  }
}
