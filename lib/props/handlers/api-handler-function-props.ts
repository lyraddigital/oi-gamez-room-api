import { ILayerVersion } from "aws-cdk-lib/aws-lambda";

export interface APIHandlerFunctionProps {
  handlerFunctionName: string;
  handlerFileLocation: string;
  environment: { [key: string]: string };
  externalModules?: string[];
  layers?: ILayerVersion[];
}
