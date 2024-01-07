import { TableV2 } from "aws-cdk-lib/aws-dynamodb";

export interface RoomsRestApiProps {
  table: TableV2;
  account: string;
  region: string;
  allowedOrigins: string;
  roomSessionCookieDomain: string;
  roomSessionCookieName: string;
  hostRoomIndexName: string;
}
