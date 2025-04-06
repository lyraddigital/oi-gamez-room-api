import { TableV2 } from "aws-cdk-lib/aws-dynamodb";
import { IEventBus } from "aws-cdk-lib/aws-events";
import { ILayerVersion } from "aws-cdk-lib/aws-lambda";

export interface HostChangedSubscriberProps {
  connectionTable: TableV2;
  roomSocketApiEndpoint: string;
  roomWebsocketApiPostArn: string;
  externalEventBus: IEventBus;
  externalEventBusEventSourceName: string;
  layers: ILayerVersion[];
}
