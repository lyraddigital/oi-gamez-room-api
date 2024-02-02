import { Construct } from "constructs";
import { Effect, PolicyStatement } from "aws-cdk-lib/aws-iam";

import {
  EnvironmentVariables,
  HandlerFilePaths,
  HandlerFunctionNames,
} from "../../constants";
import { LeaveRoomLambdaProps } from "../../props";

import { RestAPIHandlerFunction } from "./rest-api-handler-function";

export class LeaveRoomLambda extends Construct {
  constructor(scope: Construct, id: string, props: LeaveRoomLambdaProps) {
    super(scope, id);

    const leaveRoomLambda = new RestAPIHandlerFunction(this, "RestAPI", {
      handlerFileLocation: HandlerFilePaths.leaveRoom,
      handlerFunctionName: HandlerFunctionNames.leaveRoom,
      method: "DELETE",
      resource: props.resource,
      environment: {
        [EnvironmentVariables.leaveRoom.tableName]: props.table.tableName,
        [EnvironmentVariables.leaveRoom.connectionTableName]:
          props.connectionTable.tableName,
        [EnvironmentVariables.leaveRoom.corsAllowedOrigins]:
          props.allowedOrigins,
        [EnvironmentVariables.leaveRoom.eventBusName]:
          props.eventBus.eventBusName,
        [EnvironmentVariables.leaveRoom.eventBusEventSourceName]:
          props.eventBusEventSourceName,
      },
    });

    const dbTablePolicyDocument = new PolicyStatement({
      effect: Effect.ALLOW,
      resources: [props.table.tableArn],
      actions: ["dynamodb:Query", "dynamodb:UpdateItem", "dynamodb:DeleteItem"],
    });

    const dbConnectionTablePolicyDocument = new PolicyStatement({
      effect: Effect.ALLOW,
      resources: [props.connectionTable.tableArn],
      actions: ["dynamodb:Query", "dynamodb:DeleteItem"],
    });

    const ebPutEventsPolicyDocument = new PolicyStatement({
      effect: Effect.ALLOW,
      resources: [props.eventBus.eventBusArn],
      actions: ["events:PutEvents"],
    });

    leaveRoomLambda.lambdaFunction.addToRolePolicy(dbTablePolicyDocument);
    leaveRoomLambda.lambdaFunction.addToRolePolicy(
      dbConnectionTablePolicyDocument
    );
    leaveRoomLambda.lambdaFunction.addToRolePolicy(ebPutEventsPolicyDocument);
  }
}
