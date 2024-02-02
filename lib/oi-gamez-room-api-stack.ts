import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";

import {
  ConnectionTable,
  ExpiredConnectionCleanupLambda,
  RoomEventBus,
  RoomDeleteStreamLambda,
  RoomEventBridgeSubscribers,
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

    const connectionTable = new ConnectionTable(this, "ConnectionTable", {
      connectionsIndexName: IndexNames.connection,
      lastDisconnectedIndexName: IndexNames.lastDisconnected,
    });

    const roomEventBus = new RoomEventBus(this, "RoomEventBus");
    const ebEventSourceName = "room-service";

    const webSocketApi = new RoomsSocketApi(this, "RoomSocketApi", {
      roomTable: roomTable.table,
      connectionTableIndexName: IndexNames.connection,
      connectionTable: connectionTable.table,
      updatedConnectWindowInSeconds: 21600,
      account: this.account,
      region: this.region,
      roomEventBus: roomEventBus.eventBus,
      eventBusEventSourceName: ebEventSourceName,
    });

    new RoomsRestApi(this, "RoomRestApi", {
      table: roomTable.table,
      connectionTable: connectionTable.table,
      account: this.account,
      region: this.region,
      connectWindowInSeconds: 30,
      allowedOrigins: "http://localhost:3000",
      hostRoomIndexName: IndexNames.hostedRooms,
      eventBus: roomEventBus.eventBus,
      eventBusSourceName: ebEventSourceName,
    });

    new RoomDeleteStreamLambda(this, "RoomDeleteStreamLambda", {
      table: roomTable.table,
    });

    new ExpiredConnectionCleanupLambda(this, "ExpiredConnectionCleanupLambda", {
      table: roomTable.table,
      connectionTable: connectionTable.table,
      roomEventBus: roomEventBus.eventBus,
      lastDisconnectedIndexName: IndexNames.lastDisconnected,
      expiredDisconnectionWindowInSeconds: 60,
      eventBusEventSourceName: ebEventSourceName,
    });

    new RoomEventBridgeSubscribers(this, "RoomEventBridgeSubscribers", {
      eventBus: roomEventBus.eventBus,
      table: roomTable.table,
      connectionTable: connectionTable.table,
      eventBusSourceName: ebEventSourceName,
      roomSocketApiEndpoint: webSocketApi.roomWebsocketEndpoint,
      roomWebsocketApiPostArn: webSocketApi.roomWebsocketApiPostArn,
    });
  }
}
