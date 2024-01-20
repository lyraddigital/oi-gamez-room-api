import { TableV2 } from "aws-cdk-lib/aws-dynamodb";
import { IEventBus } from "aws-cdk-lib/aws-events";

export interface ExpiredConnectionCleanupLambdaProps {
  table: TableV2;
  connectionTable: TableV2;
  lastDisconnectedIndexName: string;
  expiredDisconnectionWindowInSeconds: number;
  roomEventBus: IEventBus;
}
