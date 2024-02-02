import { TableV2 } from "aws-cdk-lib/aws-dynamodb";
import { IEventBus } from "aws-cdk-lib/aws-events";

export interface EnsureRoomConnectionLambdaProps {
  connectionTable: TableV2;
  roomTable: TableV2;
  updatedConnectWindowInSeconds: number;
  roomEventBus: IEventBus;
  eventBusEventSourceName: string;
}
