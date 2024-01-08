import { TableV2 } from "aws-cdk-lib/aws-dynamodb";

export interface RoomSocketApiProps {
  table: TableV2;
}
