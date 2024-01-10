import { TableV2 } from "aws-cdk-lib/aws-dynamodb";

export interface RoomSocketApiProps {
  connectionTable: TableV2;
  roomTable: TableV2;
  updatedConnectWindowInSeconds: number;
}
