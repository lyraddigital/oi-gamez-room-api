import { TableV2 } from "aws-cdk-lib/aws-dynamodb";
import { IEventBus } from "aws-cdk-lib/aws-events";

export interface UserExpiredSubscriberProps {
  table: TableV2;
  connectionTable: TableV2;
  roomEventBus: IEventBus;
  eventBusEventSourceName: string;
}
