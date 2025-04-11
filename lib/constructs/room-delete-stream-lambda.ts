import { StartingPosition } from "aws-cdk-lib/aws-lambda";
import { DynamoEventSource } from "aws-cdk-lib/aws-lambda-event-sources";
import { Effect, PolicyStatement } from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";

import {
  EnvironmentVariables,
  HandlerFilePaths,
  HandlerFunctionNames,
} from "../constants/index.js";
import { RoomDeleteStreamLambdaProps } from "../props/index.js";
import { JobHandlerFunction } from "./job-handler-function.js";

export class RoomDeleteStreamLambda extends Construct {
  constructor(
    scope: Construct,
    id: string,
    props: RoomDeleteStreamLambdaProps
  ) {
    super(scope, id);

    const expiryLambdaFunction = new JobHandlerFunction(
      this,
      "RoomDeleteStreamLambdaProps",
      {
        handlerFileLocation: HandlerFilePaths.roomDeleteStream,
        handlerFunctionName: HandlerFunctionNames.roomDeleteStream,
        environment: {
          [EnvironmentVariables.roomDeleteStream.tableName]:
            props.table.tableName,
        },
      }
    );

    expiryLambdaFunction.lambdaFunction.addEventSource(
      new DynamoEventSource(props.table, {
        startingPosition: StartingPosition.TRIM_HORIZON,
        retryAttempts: 3,
      })
    );

    var policyDocument = new PolicyStatement({
      effect: Effect.ALLOW,
      resources: [props.table.tableArn],
      actions: ["dynamodb:DeleteItem", "dynamodb:UpdateItem"],
    });

    expiryLambdaFunction.lambdaFunction.addToRolePolicy(policyDocument);
  }
}
