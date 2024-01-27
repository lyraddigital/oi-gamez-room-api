import { TableV2 } from "aws-cdk-lib/aws-dynamodb";

export interface EnsureRoomConnectionLambdaProps {
  connectionTable: TableV2;
  roomTable: TableV2;
  updatedConnectWindowInSeconds: number;
}
