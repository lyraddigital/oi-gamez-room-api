import { TableV2 } from "aws-cdk-lib/aws-dynamodb";

export interface ExpiredConnectionCleanupLambdaProps {
  table: TableV2;
  connectionTable: TableV2;
  lastDisconnectedIndexName: string;
  expiredDisconnectionWindowInSeconds: number;
}
