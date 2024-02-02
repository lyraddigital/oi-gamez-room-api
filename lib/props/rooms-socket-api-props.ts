import { TableV2 } from "aws-cdk-lib/aws-dynamodb";
import { IEventBus } from "aws-cdk-lib/aws-events";

export interface RoomSocketApiProps {
  connectionTable: TableV2;
  roomTable: TableV2;
  connectionTableIndexName: string;
  updatedConnectWindowInSeconds: number;
  account: string;
  region: string;
  roomEventBus: IEventBus;
  eventBusEventSourceName: string;
}
