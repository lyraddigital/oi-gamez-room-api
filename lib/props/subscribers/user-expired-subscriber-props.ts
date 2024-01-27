import { TableV2 } from "aws-cdk-lib/aws-dynamodb";

export interface UserExpiredSubscriberProps {
  table: TableV2;
  connectionTable: TableV2;
}
