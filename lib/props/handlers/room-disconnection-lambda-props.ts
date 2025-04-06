import { TableV2 } from "aws-cdk-lib/aws-dynamodb";
import { ILayerVersion } from "aws-cdk-lib/aws-lambda";

export interface RoomDisconnectionLambdaProps {
  connectionTable: TableV2;
  connectionTableIndexName: string;
  layers: ILayerVersion[];
}
