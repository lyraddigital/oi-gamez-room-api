import { TableV2 } from "aws-cdk-lib/aws-dynamodb";
import { ILayerVersion } from "aws-cdk-lib/aws-lambda";

export interface GameCompletedSubscriberProps {
  table: TableV2;
  connectionTable: TableV2;
  roomSocketApiEndpoint: string;
  roomWebsocketApiPostArn: string;
  layers: ILayerVersion[];
}
