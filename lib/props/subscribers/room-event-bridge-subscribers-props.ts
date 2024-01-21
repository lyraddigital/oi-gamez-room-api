import { TableV2 } from "aws-cdk-lib/aws-dynamodb";
import { IEventBus } from "aws-cdk-lib/aws-events";

export interface RoomEventBridgeSubscribersProps {
  eventBus: IEventBus;
  table: TableV2;
  connectionTable: TableV2;
}
