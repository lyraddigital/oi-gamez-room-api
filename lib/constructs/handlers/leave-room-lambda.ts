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

    leaveRoomLambda.lambdaFunction.addToRolePolicy(dbTablePolicyDocument);
    leaveRoomLambda.lambdaFunction.addToRolePolicy(
      dbConnectionTablePolicyDocument
    );
  }
}
