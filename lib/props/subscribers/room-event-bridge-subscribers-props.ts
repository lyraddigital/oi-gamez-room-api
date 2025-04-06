import { TableV2 } from "aws-cdk-lib/aws-dynamodb";
import { IEventBus } from "aws-cdk-lib/aws-events";
import { ILayerVersion } from "aws-cdk-lib/aws-lambda";

export interface RoomEventBridgeSubscribersProps {
  eventBus: IEventBus;
  eventBusSourceName: string;
  externalEventBus: IEventBus;
  externalEventBusEventSourceName: string;
  roomReceiveEventBus: IEventBus;
  roomReceiveEventBusSourceName: string;
  table: TableV2;
  connectionTable: TableV2;
  roomSocketApiEndpoint: string;
  roomWebsocketApiPostArn: string;
  roomWebsocketApiDeleteArn: string;
  coreLayer: ILayerVersion;
}
