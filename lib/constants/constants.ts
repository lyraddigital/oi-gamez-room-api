interface EnvironmentVariables {
  getGameTypes: GetGameTypesEnvironmentVariables;
  createRoom: CreateRoomEnvironmentVariables;
  expiredConnectionCleanup: ExpiredConnectionCleanupEnvironmentVariables;
  getRoomStatus: GetRoomStatusEnvironmentVariables;
  joinRoom: JoinRoomEnvironmentVariables;
  leaveRoom: LeaveRoomEnvironmentVariables;
  ensureRoomConnection: EnsureRoomEnvironmentVariables;
  roomDeleteStream: RoomDeleteStreamEnvironmentVariables;
  roomDisconnection: RoomDisconnectionEnvironmentVariables;
  hostConnectionDisconnectionSubscriber: HostConnectionDisconnectionSubscriberEnvironmentVariables;
  userConnectionDisconnectionSubscriber: UserConnectionDisconnectionSubscriberEnvironmentVariables;
}

interface GetGameTypesEnvironmentVariables {
  tableName: string;
  corsAllowedOrigins: string;
}

interface CreateRoomEnvironmentVariables {
  tableName: string;
  connectWindowInSeconds: string;
  corsAllowedOrigins: string;
  hostRoomIndexName: string;
}

interface ExpiredConnectionCleanupEnvironmentVariables {
  tableName: string;
  eventBusName: string;
  connectionTableName: string;
  lastDisconnectedIndexName: string;
  expiredDisconnectionWindoewInSeconds: string;
}

interface GetRoomStatusEnvironmentVariables {
  tableName: string;
  corsAllowedOrigins: string;
}

interface JoinRoomEnvironmentVariables {
  tableName: string;
  connectionTableName: string;
  corsAllowedOrigins: string;
}

interface LeaveRoomEnvironmentVariables {
  tableName: string;
  connectionTableName: string;
  corsAllowedOrigins: string;
}

interface EnsureRoomEnvironmentVariables {
  connectionTableName: string;
  roomTableName: string;
  updatedConnectionWindow: string;
}

interface RoomDeleteStreamEnvironmentVariables {
  tableName: string;
}

interface RoomDisconnectionEnvironmentVariables {
  connectionTableName: string;
  connectionIndexName: string;
}

interface HostConnectionDisconnectionSubscriberEnvironmentVariables {
  connectionTableName: string;
  tableName: string;
}

interface UserConnectionDisconnectionSubscriberEnvironmentVariables {
  connectionTableName: string;
  tableName: string;
}

interface HandlerFilePaths {
  getGameTypes: string;
  createRoom: string;
  getRoomStatus: string;
  joinRoom: string;
  leaveRoom: string;
  ensureRoomConnection: string;
  expiredConnectionCleanup: string;
  roomDisconnection: string;
  roomDeleteStream: string;
  hostConnectionDisconnectionSubscriber: string;
  userConnectionDisconnectionSubscriber: string;
}

interface ResourcePaths {
  gameTypes: string;
  rooms: string;
  room: string;
}

interface HandlerFunctionNames {
  getGameTypes: string;
  createRoom: string;
  getRoomStatus: string;
  joinRoom: string;
  leaveRoom: string;
  ensureRoomConnection: string;
  expiredConnectionCleanup: string;
  roomDeleteStream: string;
  roomDisconnection: string;
  hostConnectionDisconnectionSubscriber: string;
  userConnectionDisconnectionSubscriber: string;
}

interface IndexNames {
  hostedRooms: string;
  connection: string;
  lastDisconnected: string;
}

export const ResourcePaths: ResourcePaths = {
  gameTypes: "game-types",
  rooms: "rooms",
  room: "{roomCode}",
};

export const EnvironmentVariables: EnvironmentVariables = {
  getGameTypes: {
    tableName: "DYNAMO_TABLE_NAME",
    corsAllowedOrigins: "CORS_ALLOWED_ORIGINS",
  },
  createRoom: {
    tableName: "DYNAMO_TABLE_NAME",
    connectWindowInSeconds: "CONNECT_WINDOW_IN_SECONDS",
    corsAllowedOrigins: "CORS_ALLOWED_ORIGINS",
    hostRoomIndexName: "HOST_ROOM_INDEX_NAME",
  },
  expiredConnectionCleanup: {
    tableName: "DYNAMO_TABLE_NAME",
    eventBusName: "USER_DISCONNECTION_EB_NAME",
    connectionTableName: "CONNECTION_DYNAMO_TABLE_NAME",
    lastDisconnectedIndexName: "CONNECTION_DYNAMO_LAST_DISCONNECTED_INDEX_NAME",
    expiredDisconnectionWindoewInSeconds:
      "EXPIRED_DISCONNECTION_WINDOW_IN_SECONDS",
  },
  getRoomStatus: {
    tableName: "DYNAMO_TABLE_NAME",
    corsAllowedOrigins: "CORS_ALLOWED_ORIGINS",
  },
  joinRoom: {
    tableName: "DYNAMO_TABLE_NAME",
    connectionTableName: "CONNECTION_DYNAMO_TABLE_NAME",
    corsAllowedOrigins: "CORS_ALLOWED_ORIGINS",
  },
  leaveRoom: {
    tableName: "DYNAMO_TABLE_NAME",
    connectionTableName: "CONNECTION_DYNAMO_TABLE_NAME",
    corsAllowedOrigins: "CORS_ALLOWED_ORIGINS",
  },
  ensureRoomConnection: {
    connectionTableName: "CONNECTION_DYNAMO_TABLE_NAME",
    roomTableName: "DYNAMO_TABLE_NAME",
    updatedConnectionWindow: "UPDATED_CONNECT_WINDOW_IN_SECONDS",
  },
  roomDeleteStream: {
    tableName: "DYNAMO_TABLE_NAME",
  },
  roomDisconnection: {
    connectionTableName: "CONNECTION_DYNAMO_TABLE_NAME",
    connectionIndexName: "CONNECTION_DYNAMO_INDEX_NAME",
  },
  hostConnectionDisconnectionSubscriber: {
    tableName: "DYNAMO_TABLE_NAME",
    connectionTableName: "CONNECTION_DYNAMO_TABLE_NAME",
  },
  userConnectionDisconnectionSubscriber: {
    tableName: "DYNAMO_TABLE_NAME",
    connectionTableName: "CONNECTION_DYNAMO_TABLE_NAME",
  },
};

export const HandlerFilePaths: HandlerFilePaths = {
  getGameTypes:
    "../../../lambda/handlers/rest/get-game-types-handler/src/index.ts",
  createRoom: "../../../lambda/handlers/rest/create-room-handler/src/index.ts",
  expiredConnectionCleanup:
    "../../../lambda/handlers/cron/expired-connections-handler/src/index.ts",
  getRoomStatus:
    "../../../lambda/handlers/rest/get-room-status-handler/src/index.ts",
  joinRoom: "../../../lambda/handlers/rest/join-room-handler/src/index.ts",
  leaveRoom: "../../../lambda/handlers/rest/leave-room-handler/src/index.ts",
  ensureRoomConnection:
    "../../../lambda/handlers/websocket/ensure-room-connection-handler/src/index.ts",
  roomDeleteStream:
    "../../lambda/handlers/dynamo-db/room-deleted-handler/src/index.ts",
  roomDisconnection:
    "../../../lambda/handlers/websocket/room-disconnection-handler/src/index.ts",
  hostConnectionDisconnectionSubscriber:
    "../../../lambda/handlers/subscribers/host-connection-disconnection-subscriber/src/index.ts",
  userConnectionDisconnectionSubscriber:
    "../../../lambda/handlers/subscribers/user-connection-disconnection-subscriber/src/index.ts",
};

export const HandlerFunctionNames: HandlerFunctionNames = {
  getGameTypes: "handler",
  createRoom: "handler",
  expiredConnectionCleanup: "handler",
  getRoomStatus: "handler",
  joinRoom: "handler",
  leaveRoom: "handler",
  ensureRoomConnection: "handler",
  roomDeleteStream: "handler",
  roomDisconnection: "handler",
  hostConnectionDisconnectionSubscriber: "handler",
  userConnectionDisconnectionSubscriber: "handler",
};

export const IndexNames: IndexNames = {
  hostedRooms: "HostedRooms-index",
  connection: "Connection-index",
  lastDisconnected: "LastDisconnected-index",
};
