import { TableV2 } from "aws-cdk-lib/aws-dynamodb";
import { IEventBus } from "aws-cdk-lib/aws-events";

export interface RoomsRestApiProps {
  table: TableV2;
  connectionTable: TableV2;
  account: string;
  region: string;
  allowedOrigins: string;
  connectWindowInSeconds: number;
  numberOfPublicRoomsToRetrieve: number;
  hostRoomIndexName: string;
  visibleRoomsIndexName: string;
  eventBus: IEventBus;
  eventBusSourceName: string;
}
