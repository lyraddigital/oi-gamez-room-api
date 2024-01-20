import { Construct } from "constructs";
import { aws_events_targets } from "aws-cdk-lib";
import { Rule } from "aws-cdk-lib/aws-events";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction, OutputFormat } from "aws-cdk-lib/aws-lambda-nodejs";
import { join } from "path";

import {
  HandlerFunctionNames,
  HandlerFilePaths,
  EnvironmentVariables,
} from "../../constants";
import { HostConnectionDisconnectionSubscriberProps } from "../../props";
import { Effect, PolicyStatement } from "aws-cdk-lib/aws-iam";

export class HostConnectionDisconnectionSubscriber extends Construct {
  constructor(
    scope: Construct,
    id: string,
    props: HostConnectionDisconnectionSubscriberProps
  ) {
    super(scope, id);

    const lambdaFunction = new NodejsFunction(this, "LambdaFunction", {
      runtime: Runtime.NODEJS_18_X,
      handler: HandlerFunctionNames.hostConnectionDisconnectionSubscriber,
      entry: join(
        __dirname,
        HandlerFilePaths.hostConnectionDisconnectionSubscriber
      ),
      bundling: {
        format: OutputFormat.ESM,
      },
      environment: {
        [EnvironmentVariables.hostConnectionDisconnectionSubscriber
          .connectionTableName]: props.connectionTable.tableName,
      },
    });

    const connectionTablePolicyDocument = new PolicyStatement({
      effect: Effect.ALLOW,
      resources: [props.connectionTable.tableArn],
      actions: ["dynamodb:DeleteItem"],
    });

    lambdaFunction.addToRolePolicy(connectionTablePolicyDocument);

    new Rule(this, "RoomDisconnectionSubscriberRule", {
      description:
        "Rule that subscribes to room disconnections and will in turn remove all other associated to the room.",
      targets: [new aws_events_targets.LambdaFunction(lambdaFunction)],
      eventPattern: {
        source: ["room.expired-connection-handler"],
      },
      eventBus: props.eventBus,
    });
  }
}