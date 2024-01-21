import { TableV2 } from "aws-cdk-lib/aws-dynamodb";

export interface UserDisconnectionSubscriberProps {
  table: TableV2;
}
