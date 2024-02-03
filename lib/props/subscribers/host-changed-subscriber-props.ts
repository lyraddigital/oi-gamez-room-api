import { TableV2 } from "aws-cdk-lib/aws-dynamodb";
import { IEventBus } from "aws-cdk-lib/aws-events";

export interface HostChangedSubscriberProps {
  connectionTable: TableV2;
  roomSocketApiEndpoint: string;
  roomWebsocketApiPostArn: string;
  externalEventBus: IEventBus;
  externalEventBusEventSourceName: string;
}
