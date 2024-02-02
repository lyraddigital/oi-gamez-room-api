import { TableV2 } from "aws-cdk-lib/aws-dynamodb";
import { IEventBus } from "aws-cdk-lib/aws-events";

export interface RoomEventBridgeSubscribersProps {
  eventBus: IEventBus;
  eventBusSourceName: string;
  table: TableV2;
  connectionTable: TableV2;
  roomSocketApiEndpoint: string;
  roomWebsocketApiPostArn: string;
}
