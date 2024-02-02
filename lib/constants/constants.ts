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
  hostExpiredSubscriber: HostExpiredSubscriberEnvironmentVariables;
  userExpiredSubscriber: UserExpiredSubscriberEnvironmentVariables;
  roomRemovedSubscriber: RoomRemovedSubscriberEnvironmentVariables;
  userJoinedSubscriber: UserJoinedSubscriberEnvironmentVariables;
  userLeftSubscriber: UserLeftSubscriberEnvironmentVariables;
  hostChangedSubscriber: HostChangedSubscriberEnvironmentVariables;
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
  connectionTableName: string;
  lastDisconnectedIndexName: string;
  expiredDisconnectionWindowInSeconds: string;
  eventBusName: string;
  eventBusEventSourceName: string;
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
  eventBusName: string;
  eventBusEventSourceName: string;
}

interface EnsureRoomEnvironmentVariables {
  connectionTableName: string;
  roomTableName: string;
  updatedConnectionWindow: string;
  eventBusName: string;
  eventBusEventSourceName: string;
}

interface RoomDeleteStreamEnvironmentVariables {
  tableName: string;
}

interface RoomDisconnectionEnvironmentVariables {
  connectionTableName: string;
  connectionIndexName: string;
}

interface HostExpiredSubscriberEnvironmentVariables {
  connectionTableName: string;
  tableName: string;
  eventBusName: string;
  eventBusEventSourceName: string;
}

interface UserExpiredSubscriberEnvironmentVariables {
  connectionTableName: string;
  tableName: string;
  eventBusName: string;
  eventBusEventSourceName: string;
}

interface RoomRemovedSubscriberEnvironmentVariables {
  connectionTableName: string;
  roomSocketApiEndpoint: string;
}

interface UserJoinedSubscriberEnvironmentVariables {
  connectionTableName: string;
  roomSocketApiEndpoint: string;
}

interface UserLeftSubscriberEnvironmentVariables {
  connectionTableName: string;
  roomSocketApiEndpoint: string;
}

interface HostChangedSubscriberEnvironmentVariables {
  connectionTableName: string;
  roomSocketApiEndpoint: string;
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
  hostExpiredSubscriber: string;
  userExpiredSubscriber: string;
  roomRemovedSubscriber: string;
  userJoinedSubscriber: string;
  userLeftSubscriber: string;
  hostChangedSubscriber: string;
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
  hostExpiredSubscriber: string;
  userExpiredSubscriber: string;
  roomRemovedSubscriber: string;
  userJoinedSubscriber: string;
  userLeftSubscriber: string;
  hostChangedSubscriber: string;
}

interface IndexNames {
  hostedRooms: string;
  connection: string;
  lastDisconnected: string;
}

interface EventTypes {
  hostConnectionExpired: string;
  userConnectionExpired: string;
  roomRemoved: string;
  userJoined: string;
  userLeft: string;
  changeHost: string;
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
    eventBusName: "EB_EB_NAME",
    eventBusEventSourceName: "EB_EVENT_SOURCE_NAME",
    connectionTableName: "CONNECTION_DYNAMO_TABLE_NAME",
    lastDisconnectedIndexName: "CONNECTION_DYNAMO_LAST_DISCONNECTED_INDEX_NAME",
    expiredDisconnectionWindowInSeconds:
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
    eventBusName: "EB_EB_NAME",
    eventBusEventSourceName: "EB_EVENT_SOURCE_NAME",
  },
  ensureRoomConnection: {
    connectionTableName: "CONNECTION_DYNAMO_TABLE_NAME",
    roomTableName: "DYNAMO_TABLE_NAME",
    updatedConnectionWindow: "UPDATED_CONNECT_WINDOW_IN_SECONDS",
    eventBusName: "EB_EB_NAME",
    eventBusEventSourceName: "EB_EVENT_SOURCE_NAME",
  },
  roomDeleteStream: {
    tableName: "DYNAMO_TABLE_NAME",
  },
  roomDisconnection: {
    connectionTableName: "CONNECTION_DYNAMO_TABLE_NAME",
    connectionIndexName: "CONNECTION_DYNAMO_INDEX_NAME",
  },
  hostExpiredSubscriber: {
    tableName: "DYNAMO_TABLE_NAME",
    connectionTableName: "CONNECTION_DYNAMO_TABLE_NAME",
    eventBusName: "EB_EB_NAME",
    eventBusEventSourceName: "EB_EVENT_SOURCE_NAME",
  },
  userExpiredSubscriber: {
    tableName: "DYNAMO_TABLE_NAME",
    connectionTableName: "CONNECTION_DYNAMO_TABLE_NAME",
    eventBusName: "EB_EB_NAME",
    eventBusEventSourceName: "EB_EVENT_SOURCE_NAME",
  },
  roomRemovedSubscriber: {
    connectionTableName: "CONNECTION_DYNAMO_TABLE_NAME",
    roomSocketApiEndpoint: "ROOM_SOCKET_API_ENDPOINT",
  },
  userJoinedSubscriber: {
    connectionTableName: "CONNECTION_DYNAMO_TABLE_NAME",
    roomSocketApiEndpoint: "ROOM_SOCKET_API_ENDPOINT",
  },
  userLeftSubscriber: {
    connectionTableName: "CONNECTION_DYNAMO_TABLE_NAME",
    roomSocketApiEndpoint: "ROOM_SOCKET_API_ENDPOINT",
  },
  hostChangedSubscriber: {
    connectionTableName: "CONNECTION_DYNAMO_TABLE_NAME",
    roomSocketApiEndpoint: "ROOM_SOCKET_API_ENDPOINT",
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
  hostExpiredSubscriber:
    "../../../lambda/handlers/subscribers/host-expired-subscriber/src/index.ts",
  userExpiredSubscriber:
    "../../../lambda/handlers/subscribers/user-expired-subscriber/src/index.ts",
  roomRemovedSubscriber:
    "../../../lambda/handlers/subscribers/room-removed-subscriber/src/index.ts",
  userJoinedSubscriber:
    "../../../lambda/handlers/subscribers/user-joined-subscriber/src/index.ts",
  userLeftSubscriber:
    "../../../lambda/handlers/subscribers/user-left-subscriber/src/index.ts",
  hostChangedSubscriber:
    "../../../lambda/handlers/subscribers/host-changed-subscriber/src/index.ts",
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
  hostExpiredSubscriber: "handler",
  userExpiredSubscriber: "handler",
  roomRemovedSubscriber: "handler",
  userJoinedSubscriber: "handler",
  userLeftSubscriber: "handler",
  hostChangedSubscriber: "handler",
};

export const IndexNames: IndexNames = {
  hostedRooms: "HostedRooms-index",
  connection: "Connection-index",
  lastDisconnected: "LastDisconnected-index",
};

export const EventTypes: EventTypes = {
  hostConnectionExpired: "room-internal.host-connection-expired",
  userConnectionExpired: "room-internal.user-connection-expired",
  roomRemoved: "room-internal.room-removed",
  userJoined: "room-internal.user-joined",
  userLeft: "room-internal.user-left",
  changeHost: "room-internal.change-host",
};
