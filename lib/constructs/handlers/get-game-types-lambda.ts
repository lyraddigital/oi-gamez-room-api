import { Construct } from "constructs";
import { Effect, PolicyStatement } from "aws-cdk-lib/aws-iam";

import {
  EnvironmentVariables,
  ExternalLibraries,
  HandlerFilePaths,
  HandlerFunctionNames,
} from "../../constants";
import { GetGameTypesLambdaProps } from "../../props";

import { RestAPIHandlerFunction } from "./rest-api-handler-function";

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
