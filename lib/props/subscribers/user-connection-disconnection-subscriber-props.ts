import { TableV2 } from "aws-cdk-lib/aws-dynamodb";

export interface UserConnectionDisconnectionSubscriberProps {
  connectionTable: TableV2;
}
