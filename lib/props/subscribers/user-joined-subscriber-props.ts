import { TableV2 } from "aws-cdk-lib/aws-dynamodb";

export interface UserJoinedSubscriberProps {
  connectionTable: TableV2;
  roomSocketApiEndpoint: string;
  roomWebsocketApiPostArn: string;
}
