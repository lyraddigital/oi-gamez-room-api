import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction, OutputFormat } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { join } from "path";

import { ExternalLibraries } from "../constants/index.js";
import { JobHandlerFunctionProps } from "../props/index.js";

export class JobHandlerFunction extends Construct {
  public lambdaFunction: NodejsFunction;

  constructor(scope: Construct, id: string, props: JobHandlerFunctionProps) {
    super(scope, id);

    this.lambdaFunction = new NodejsFunction(this, "LambdaFunction", {
      runtime: Runtime.NODEJS_20_X,
      handler: `${props.handlerFunctionName}`,
      entry: join(__dirname, props.handlerFileLocation),
      environment: props.environment,
      bundling: {
        format: OutputFormat.ESM,
        externalModules: ExternalLibraries.getAllExternalLibraries(),
      },
    });
  }
}
