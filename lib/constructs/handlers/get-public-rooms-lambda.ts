import { Effect, PolicyStatement } from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";

import {
  EnvironmentVariables,
  HandlerFilePaths,
  HandlerFunctionNames,
  IndexNames,
} from "../../constants/index.js";
import { GetPublicRoomsLambdaProps } from "../../props/index.js";

import { RestAPIHandlerFunction } from "./rest-api-handler-function.js";

export class GetPublicRoomsLambda extends Construct {
  constructor(scope: Construct, id: string, props: GetPublicRoomsLambdaProps) {
    super(scope, id);

    const getGameTypesLambda = new RestAPIHandlerFunction(this, "RestAPI", {
      handlerFileLocation: HandlerFilePaths.getPublicRooms,
      handlerFunctionName: HandlerFunctionNames.getPublicRooms,
      method: "GET",
      resource: props.resource,
      environment: {
        [EnvironmentVariables.getPublicRooms.tableName]: props.table.tableName,
        [EnvironmentVariables.getPublicRooms.visibleRoomsIndexName]:
          props.visibleRoomsIndexName,
        [EnvironmentVariables.getPublicRooms.corsAllowedOrigins]:
          props.allowedOrigins,
        [EnvironmentVariables.getPublicRooms.publicRoomsToRetrieve]:
          props.numberOfPublicRoomsToRetrieve.toString(),
      },
      layers: props.layers || [],
    });

    const dbHostVisibleIndexPolicyDocument = new PolicyStatement({
      effect: Effect.ALLOW,
      resources: [`${props.table.tableArn}/index/${IndexNames.visibleRooms}`],
      actions: ["dynamodb:Query"],
    });

    getGameTypesLambda.lambdaFunction.addToRolePolicy(
      dbHostVisibleIndexPolicyDocument
    );
  }
}
