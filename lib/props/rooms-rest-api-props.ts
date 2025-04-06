import { TableV2 } from "aws-cdk-lib/aws-dynamodb";
import { IEventBus } from "aws-cdk-lib/aws-events";
import { ILayerVersion } from "aws-cdk-lib/aws-lambda";

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
  encryptionKey: string;
  encryptionIV: string;
  jwtSecretKey: string;
  jwtExpiryInMinutes: number;
  coreLayer: ILayerVersion;
  httpLayer: ILayerVersion;
}
