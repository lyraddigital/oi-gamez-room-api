import { TableV2 } from "aws-cdk-lib/aws-dynamodb";

export interface HostChangedSubscriberProps {
  connectionTable: TableV2;
  roomSocketApiEndpoint: string;
  roomWebsocketApiPostArn: string;
}
