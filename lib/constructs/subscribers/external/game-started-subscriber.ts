import { Construct } from "constructs";
import { Effect, PolicyStatement } from "aws-cdk-lib/aws-iam";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction, OutputFormat } from "aws-cdk-lib/aws-lambda-nodejs";
import { join } from "path";

import {
  HandlerFunctionNames,
  HandlerFilePaths,
  EnvironmentVariables,
  ExternalLibraries,
} from "../../../constants/index.js";
import { GameStartedSubscriberProps } from "../../../props/index.js";

export class GameStartedSubscriber extends Construct {
  public lambdaFunction: NodejsFunction;

  constructor(scope: Construct, id: string, props: GameStartedSubscriberProps) {
    super(scope, id);

    this.lambdaFunction = new NodejsFunction(this, "LambdaFunction", {
      runtime: Runtime.NODEJS_20_X,
      handler: HandlerFunctionNames.gameStartedSubscriber,
      entry: join(__dirname, HandlerFilePaths.gameStartedSubscriber),
      bundling: {
        format: OutputFormat.ESM,
        externalModules: ExternalLibraries.getAllExternalLibraries(),
      },
      environment: {
        [EnvironmentVariables.gameStartedSubscriber.tableName]:
          props.table.tableName,
        [EnvironmentVariables.gameStartedSubscriber.connectionTableName]:
          props.connectionTable.tableName,
        [EnvironmentVariables.gameStartedSubscriber.roomSocketApiEndpoint]:
          props.roomSocketApiEndpoint,
      },
      layers: props.layers,
    });

    const tablePolicyDocument = new PolicyStatement({
      effect: Effect.ALLOW,
      resources: [props.table.tableArn],
      actions: ["dynamodb:UpdateItem"],
    });

    const connectionTablePolicyDocument = new PolicyStatement({
      effect: Effect.ALLOW,
      resources: [props.connectionTable.tableArn],
      actions: ["dynamodb:Query"],
    });

    const webSocketApiPostPolicyDocument = new PolicyStatement({
      effect: Effect.ALLOW,
      resources: [props.roomWebsocketApiPostArn],
      actions: ["execute-api:ManageConnections"],
    });

    this.lambdaFunction.addToRolePolicy(tablePolicyDocument);
    this.lambdaFunction.addToRolePolicy(connectionTablePolicyDocument);
    this.lambdaFunction.addToRolePolicy(webSocketApiPostPolicyDocument);
  }
}
