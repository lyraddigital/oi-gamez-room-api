import { TableV2 } from "aws-cdk-lib/aws-dynamodb";

export interface GameMessageSubscriberProps {
  table: TableV2;
  connectionTable: TableV2;
  roomSocketApiEndpoint: string;
  roomWebsocketApiPostArn: string;
}
