import { TableV2 } from "aws-cdk-lib/aws-dynamodb";

export interface UserRemovedSubscriberProps {
  table: TableV2;
  connectionTable: TableV2;
}
