import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";

import {
  ConnectionTable,
  RoomsRestApi,
  RoomsSocketApi,
  RoomTable,
} from "./constructs";
import { IndexNames } from "./constants";

export class OiGamezRoomApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const roomTable = new RoomTable(this, "RoomTable", {
      hostedRoomsIndexName: IndexNames.hostedRooms,
    });

    const connectionTable = new ConnectionTable(this, "ConnectionTable");

    new RoomsRestApi(this, "RoomRestApi", {
      table: roomTable.table,
      connectionTable: connectionTable.table,
      account: this.account,
      region: this.region,
      connectWindowInSeconds: 30,
      allowedOrigins: "http://localhost:3000",
      hostRoomIndexName: IndexNames.hostedRooms,
    });

    new RoomsSocketApi(this, "RoomSocketApi", {
      roomTable: roomTable.table,
      connectionTable: connectionTable.table,
      updatedConnectWindowInSeconds: 21600,
    });
  }
}
