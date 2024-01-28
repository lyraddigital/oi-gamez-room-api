import { TableV2 } from "aws-cdk-lib/aws-dynamodb";

export interface RoomsRestApiProps {
  table: TableV2;
  connectionTable: TableV2;
  account: string;
  region: string;
  allowedOrigins: string;
  connectWindowInSeconds: number;
  hostRoomIndexName: string;
  roomWebsocketEndpoint: string;
  roomWebsocketApiPostArn: string;
  roomWebsocketApiDeleteArn: string;
}
