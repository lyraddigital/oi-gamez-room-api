import { TableV2 } from "aws-cdk-lib/aws-dynamodb";
import { IEventBus } from "aws-cdk-lib/aws-events";
import { ILayerVersion } from "aws-cdk-lib/aws-lambda";

export interface RoomRemovedSubscriberProps {
  connectionTable: TableV2;
  externalEventBus: IEventBus;
  externalEventBusEventSourceName: string;
  roomSocketApiEndpoint: string;
  roomWebsocketApiPostArn: string;
  roomWebsocketApiDeleteArn: string;
  layers: ILayerVersion[];
}
