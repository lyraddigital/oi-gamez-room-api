import { TableV2 } from "aws-cdk-lib/aws-dynamodb";

export interface RoomDeleteStreamLambdaProps {
  table: TableV2;
}
