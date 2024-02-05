import { Construct } from "constructs";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction, OutputFormat } from "aws-cdk-lib/aws-lambda-nodejs";
import { join } from "path";

import { HandlerFunctionNames, HandlerFilePaths } from "../../../constants";
import { GameInitializedSubscriberProps } from "../../../props";

export class GameInitializedSubscriber extends Construct {
  public lambdaFunction: NodejsFunction;

  constructor(
    scope: Construct,
    id: string,
    props: GameInitializedSubscriberProps
  ) {
    super(scope, id);

    this.lambdaFunction = new NodejsFunction(this, "LambdaFunction", {
      runtime: Runtime.NODEJS_18_X,
      handler: HandlerFunctionNames.gameInitializedSubscriber,
      entry: join(__dirname, HandlerFilePaths.gameInitializedSubscriber),
      bundling: {
        format: OutputFormat.ESM,
      },
      environment: {},
    });
  }
}
