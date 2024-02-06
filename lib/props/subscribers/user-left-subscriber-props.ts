import { TableV2 } from "aws-cdk-lib/aws-dynamodb";
import { IEventBus } from "aws-cdk-lib/aws-events";

export interface UserLeftSubscriberProps {
  table: TableV2;
  connectionTable: TableV2;
  externalEventBus: IEventBus;
  externalEventBusEventSourceName: string;
  roomSocketApiEndpoint: string;
  roomWebsocketApiPostArn: string;
  roomWebsocketApiDeleteArn: string;
}
