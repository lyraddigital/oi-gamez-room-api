import { TableV2 } from "aws-cdk-lib/aws-dynamodb";
import { IEventBus } from "aws-cdk-lib/aws-events";
import { ILayerVersion } from "aws-cdk-lib/aws-lambda";

export interface EnsureRoomConnectionLambdaProps {
  connectionTable: TableV2;
  roomTable: TableV2;
  updatedConnectWindowInSeconds: number;
  roomEventBus: IEventBus;
  roomExternalEventBus: IEventBus;
  eventBusEventSourceName: string;
  roomExternalEventBusSourceName: string;
  layers: ILayerVersion[];
}
