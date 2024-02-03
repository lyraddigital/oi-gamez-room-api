import { Construct } from "constructs";
import { Effect, PolicyStatement } from "aws-cdk-lib/aws-iam";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction, OutputFormat } from "aws-cdk-lib/aws-lambda-nodejs";
import { join } from "path";

import {
  HandlerFunctionNames,
  HandlerFilePaths,
  EnvironmentVariables,
} from "../../../constants";
import { UserLeftSubscriberProps } from "../../../props";

export class UserLeftSubscriber extends Construct {
  public lambdaFunction: NodejsFunction;

  constructor(scope: Construct, id: string, props: UserLeftSubscriberProps) {
    super(scope, id);

    this.lambdaFunction = new NodejsFunction(this, "LambdaFunction", {
      runtime: Runtime.NODEJS_18_X,
      handler: HandlerFunctionNames.userLeftSubscriber,
      entry: join(__dirname, HandlerFilePaths.userLeftSubscriber),
      bundling: {
        format: OutputFormat.ESM,
      },
      environment: {
        [EnvironmentVariables.userLeftSubscriber.connectionTableName]:
          props.connectionTable.tableName,
        [EnvironmentVariables.userLeftSubscriber.roomSocketApiEndpoint]:
          props.roomSocketApiEndpoint,
        [EnvironmentVariables.userLeftSubscriber.externalEventBusName]:
          props.externalEventBus.eventBusName,
        [EnvironmentVariables.userLeftSubscriber
          .externalEventBusEventSourceName]:
          props.externalEventBusEventSourceName,
      },
    });

    const connectionTablePolicyDocument = new PolicyStatement({
      effect: Effect.ALLOW,
      resources: [props.connectionTable.tableArn],
      actions: ["dynamodb:Query"],
    });

    const webSocketApiPostPolicyDocument = new PolicyStatement({
      effect: Effect.ALLOW,
      resources: [
        props.roomWebsocketApiPostArn,
        props.roomWebsocketApiDeleteArn,
      ],
      actions: ["execute-api:ManageConnections"],
    });

    const ebPutEventsPolicyDocument = new PolicyStatement({
      effect: Effect.ALLOW,
      resources: [props.externalEventBus.eventBusArn],
      actions: ["events:PutEvents"],
    });

    this.lambdaFunction.addToRolePolicy(connectionTablePolicyDocument);
    this.lambdaFunction.addToRolePolicy(webSocketApiPostPolicyDocument);
    this.lambdaFunction.addToRolePolicy(ebPutEventsPolicyDocument);
  }
}
