import { IResource } from "aws-cdk-lib/aws-apigateway";
import { TableV2 } from "aws-cdk-lib/aws-dynamodb";
import { ILayerVersion } from "aws-cdk-lib/aws-lambda";

export interface LambdaHandlerProps {
  table: TableV2;
  resource: IResource;
  layers?: ILayerVersion[];
}
