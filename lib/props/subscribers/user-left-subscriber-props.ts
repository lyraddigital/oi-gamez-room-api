import { TableV2 } from "aws-cdk-lib/aws-dynamodb";

export interface UserLeftSubscriberProps {
  connectionTable: TableV2;
  roomSocketApiEndpoint: string;
  roomWebsocketApiPostArn: string;
  roomWebsocketApiDeleteArn: string;
}
