import { Runtime } from "aws-cdk-lib/aws-lambda";
import { LambdaIntegration } from "aws-cdk-lib/aws-apigateway";
import { NodejsFunction, OutputFormat } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { join } from "path";

import { ExternalLibraries } from "../../constants/index.js";
import { RestAPIHandlerFunctionProps } from "../../props/index.js";

export class RestAPIHandlerFunction extends Construct {
  public lambdaFunction: NodejsFunction;

  constructor(
    scope: Construct,
    id: string,
    props: RestAPIHandlerFunctionProps
  ) {
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
      layers: props.layers || [],
    });

    props.resource.addMethod(
      props.method,
      new LambdaIntegration(this.lambdaFunction)
    );
  }
}
