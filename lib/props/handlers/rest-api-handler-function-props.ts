import { IResource } from "aws-cdk-lib/aws-apigateway";
import { ILayerVersion } from "aws-cdk-lib/aws-lambda";

import { APIHandlerFunctionProps } from "./api-handler-function-props";

export interface RestAPIHandlerFunctionProps extends APIHandlerFunctionProps {
  method: string;
  resource: IResource;
  externalModules?: string[];
  layers?: ILayerVersion[];
}
