import { TableV2 } from "aws-cdk-lib/aws-dynamodb";

export interface RoomDisconnectionLambdaProps {
  connectionTable: TableV2;
  connectionTableIndexName: string;
}
