import { Construct } from "constructs";
import { Effect, PolicyStatement } from "aws-cdk-lib/aws-iam";

import {
  EnvironmentVariables,
  HandlerFilePaths,
  HandlerFunctionNames,
} from "../../constants/index.js";
import { GetGameTypesLambdaProps } from "../../props/index.js";

import { RestAPIHandlerFunction } from "./rest-api-handler-function.js";

export class GetGameTypesLambda extends Construct {
  constructor(scope: Construct, id: string, props: GetGameTypesLambdaProps) {
    super(scope, id);

    const getGameTypesLambda = new RestAPIHandlerFunction(this, "RestAPI", {
      handlerFileLocation: HandlerFilePaths.getGameTypes,
      handlerFunctionName: HandlerFunctionNames.getGameTypes,
      method: "GET",
      resource: props.resource,
      environment: {
        [EnvironmentVariables.getGameTypes.tableName]: props.table.tableName,
        [EnvironmentVariables.getGameTypes.corsAllowedOrigins]:
          props.allowedOrigins,
      },
      layers: props.layers || [],
    });

    const dbTablePolicyDocument = new PolicyStatement({
      effect: Effect.ALLOW,
      resources: [props.table.tableArn],
      actions: ["dynamodb:Query"],
    });

    getGameTypesLambda.lambdaFunction.addToRolePolicy(dbTablePolicyDocument);
  }
}
