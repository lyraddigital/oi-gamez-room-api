import { TableV2 } from "aws-cdk-lib/aws-dynamodb";

export interface EnsureRoomConnectionLambdaProps {
  table: TableV2;
}
