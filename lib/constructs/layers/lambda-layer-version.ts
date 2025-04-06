import {
  Architecture,
  Code,
  ILayerVersion,
  LayerVersion,
  Runtime,
} from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";

interface LambdaLayerVersionProps {
  layerPath: string;
}

export class LambdaLayerVersion extends Construct {
  public layerVersion: ILayerVersion;

  constructor(scope: Construct, id: string, props: LambdaLayerVersionProps) {
    super(scope, id);

    this.layerVersion = new LayerVersion(this, "LambdaLayer", {
      compatibleRuntimes: [Runtime.NODEJS_20_X],
      compatibleArchitectures: [Architecture.X86_64],
      code: Code.fromAsset(props.layerPath),
    });
  }
}
