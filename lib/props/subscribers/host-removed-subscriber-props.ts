import { TableV2 } from "aws-cdk-lib/aws-dynamodb";

export interface HostRemovedSubscriberProps {
  table: TableV2;
  connectionTable: TableV2;
}
