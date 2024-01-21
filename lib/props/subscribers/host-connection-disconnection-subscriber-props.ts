import { TableV2 } from "aws-cdk-lib/aws-dynamodb";

export interface HostConnectionDisconnectionSubscriberProps {
  table: TableV2;
  connectionTable: TableV2;
}
