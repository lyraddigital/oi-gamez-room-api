import { TableV2 } from "aws-cdk-lib/aws-dynamodb";

export interface HostExpiredSubscriberProps {
  table: TableV2;
  connectionTable: TableV2;
}
