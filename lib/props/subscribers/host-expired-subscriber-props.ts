import { TableV2 } from "aws-cdk-lib/aws-dynamodb";
import { IEventBus } from "aws-cdk-lib/aws-events";
import { ILayerVersion } from "aws-cdk-lib/aws-lambda";

export interface HostExpiredSubscriberProps {
  table: TableV2;
  connectionTable: TableV2;
  roomEventBus: IEventBus;
  eventBusEventSourceName: string;
  layers: ILayerVersion[];
}
