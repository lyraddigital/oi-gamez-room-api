import { TableV2 } from "aws-cdk-lib/aws-dynamodb";

export interface GameInitializedSubscriberProps {
  table: TableV2;
  connectionTable: TableV2;
  roomSocketApiEndpoint: string;
  roomWebsocketApiPostArn: string;
}
