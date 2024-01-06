import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";

import { RoomsRestApi, RoomTable } from "./constructs";

export class OiGamezRoomApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const roomTable = new RoomTable(this, "RoomTable");

    new RoomsRestApi(this, "RoomRestApi", {
      table: roomTable.table,
      account: this.account,
      region: this.region,
      allowedOrigins: "http://localhost:3000",
      roomSessionCookieDomain:
        "m7cqhw04n6.execute-api.ap-southeast-2.amazonaws.com",
      roomSessionCookieName: "RoomSessionCookie",
    });
  }
}
