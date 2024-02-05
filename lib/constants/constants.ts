enum EnvironmentVariableNames {
  dynamoTableName = "DYNAMO_TABLE_NAME",
  corsAllowedOrigins = "CORS_ALLOWED_ORIGINS",
  connectWindowInSeconds = "CONNECT_WINDOW_IN_SECONDS",
  hostRoomIndexName = "HOST_ROOM_INDEX_NAME",
  internalEventBusName = "EB_INTERNAL_EB_NAME",
  internalEventBusSourceName = "EB_INTERNAL_EVENT_SOURCE_NAME",
  connectionTableName = "CONNECTION_DYNAMO_TABLE_NAME",
  roomSocketApiEndpoint = "ROOM_SOCKET_API_ENDPOINT",
  lastDisconnectedIndexName = "CONNECTION_DYNAMO_LAST_DISCONNECTED_INDEX_NAME",
  expiredDisconnectionWindowInSeconds = "EXPIRED_DISCONNECTION_WINDOW_IN_SECONDS",
  updatedConnectionWindow = "UPDATED_CONNECT_WINDOW_IN_SECONDS",
  connectionIndexName = "CONNECTION_DYNAMO_INDEX_NAME",
  externalEventBusName = "EB_EXTERNAL_EB_NAME",
  externalEventBusSourceName = "EB_EXTERNAL_EVENT_SOURCE_NAME",
}

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
  gameInitializedSubscriber: GameInitializedSubscriberEnvironmentVariables;
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
  externalEventBusName: string;
  externalEventBusEventSourceName: string;
}

interface UserJoinedSubscriberEnvironmentVariables {
  connectionTableName: string;
  roomSocketApiEndpoint: string;
  externalEventBusName: string;
  externalEventBusEventSourceName: string;
}

interface UserLeftSubscriberEnvironmentVariables {
  connectionTableName: string;
  roomSocketApiEndpoint: string;
  externalEventBusName: string;
  externalEventBusEventSourceName: string;
}

interface HostChangedSubscriberEnvironmentVariables {
  connectionTableName: string;
  roomSocketApiEndpoint: string;
  externalEventBusName: string;
  externalEventBusEventSourceName: string;
}

interface GameInitializedSubscriberEnvironmentVariables {
  tableName: string;
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
  gameInitializedSubscriber: string;
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
  gameInitializedSubscriber: string;
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
  gameInitialization: string;
}

export const ResourcePaths: ResourcePaths = {
  gameTypes: "game-types",
  rooms: "rooms",
  room: "{roomCode}",
};

export const EnvironmentVariables: EnvironmentVariables = {
  getGameTypes: {
    tableName: EnvironmentVariableNames.dynamoTableName,
    corsAllowedOrigins: EnvironmentVariableNames.corsAllowedOrigins,
  },
  createRoom: {
    tableName: EnvironmentVariableNames.dynamoTableName,
    connectWindowInSeconds: EnvironmentVariableNames.connectWindowInSeconds,
    corsAllowedOrigins: EnvironmentVariableNames.corsAllowedOrigins,
    hostRoomIndexName: EnvironmentVariableNames.hostRoomIndexName,
  },
  expiredConnectionCleanup: {
    tableName: EnvironmentVariableNames.dynamoTableName,
    eventBusName: EnvironmentVariableNames.internalEventBusName,
    eventBusEventSourceName:
      EnvironmentVariableNames.internalEventBusSourceName,
    connectionTableName: EnvironmentVariableNames.connectionTableName,
    lastDisconnectedIndexName:
      EnvironmentVariableNames.lastDisconnectedIndexName,
    expiredDisconnectionWindowInSeconds:
      EnvironmentVariableNames.expiredDisconnectionWindowInSeconds,
  },
  getRoomStatus: {
    tableName: EnvironmentVariableNames.dynamoTableName,
    corsAllowedOrigins: EnvironmentVariableNames.corsAllowedOrigins,
  },
  joinRoom: {
    tableName: EnvironmentVariableNames.dynamoTableName,
    connectionTableName: EnvironmentVariableNames.connectionTableName,
    corsAllowedOrigins: EnvironmentVariableNames.corsAllowedOrigins,
  },
  leaveRoom: {
    tableName: EnvironmentVariableNames.dynamoTableName,
    connectionTableName: EnvironmentVariableNames.connectionTableName,
    corsAllowedOrigins: EnvironmentVariableNames.corsAllowedOrigins,
    eventBusName: EnvironmentVariableNames.internalEventBusName,
    eventBusEventSourceName:
      EnvironmentVariableNames.internalEventBusSourceName,
  },
  ensureRoomConnection: {
    connectionTableName: EnvironmentVariableNames.connectionTableName,
    roomTableName: EnvironmentVariableNames.dynamoTableName,
    updatedConnectionWindow: EnvironmentVariableNames.updatedConnectionWindow,
    eventBusName: EnvironmentVariableNames.internalEventBusName,
    eventBusEventSourceName:
      EnvironmentVariableNames.internalEventBusSourceName,
  },
  roomDeleteStream: {
    tableName: EnvironmentVariableNames.dynamoTableName,
  },
  roomDisconnection: {
    connectionTableName: EnvironmentVariableNames.connectionTableName,
    connectionIndexName: EnvironmentVariableNames.connectionIndexName,
  },
  hostExpiredSubscriber: {
    tableName: EnvironmentVariableNames.dynamoTableName,
    connectionTableName: EnvironmentVariableNames.connectionTableName,
    eventBusName: EnvironmentVariableNames.internalEventBusName,
    eventBusEventSourceName:
      EnvironmentVariableNames.internalEventBusSourceName,
  },
  userExpiredSubscriber: {
    tableName: EnvironmentVariableNames.dynamoTableName,
    connectionTableName: EnvironmentVariableNames.connectionTableName,
    eventBusName: EnvironmentVariableNames.internalEventBusName,
    eventBusEventSourceName:
      EnvironmentVariableNames.internalEventBusSourceName,
  },
  roomRemovedSubscriber: {
    connectionTableName: EnvironmentVariableNames.connectionTableName,
    roomSocketApiEndpoint: EnvironmentVariableNames.roomSocketApiEndpoint,
    externalEventBusName: EnvironmentVariableNames.externalEventBusName,
    externalEventBusEventSourceName:
      EnvironmentVariableNames.externalEventBusSourceName,
  },
  userJoinedSubscriber: {
    connectionTableName: EnvironmentVariableNames.connectionTableName,
    roomSocketApiEndpoint: EnvironmentVariableNames.roomSocketApiEndpoint,
    externalEventBusName: EnvironmentVariableNames.externalEventBusName,
    externalEventBusEventSourceName:
      EnvironmentVariableNames.externalEventBusSourceName,
  },
  userLeftSubscriber: {
    connectionTableName: EnvironmentVariableNames.connectionTableName,
    roomSocketApiEndpoint: EnvironmentVariableNames.roomSocketApiEndpoint,
    externalEventBusName: EnvironmentVariableNames.externalEventBusName,
    externalEventBusEventSourceName:
      EnvironmentVariableNames.externalEventBusSourceName,
  },
  hostChangedSubscriber: {
    connectionTableName: EnvironmentVariableNames.connectionTableName,
    roomSocketApiEndpoint: EnvironmentVariableNames.roomSocketApiEndpoint,
    externalEventBusName: EnvironmentVariableNames.externalEventBusName,
    externalEventBusEventSourceName:
      EnvironmentVariableNames.externalEventBusSourceName,
  },
  gameInitializedSubscriber: {
    tableName: EnvironmentVariableNames.dynamoTableName,
    connectionTableName: EnvironmentVariableNames.connectionTableName,
    roomSocketApiEndpoint: EnvironmentVariableNames.roomSocketApiEndpoint,
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
    "../../../../lambda/handlers/subscribers/internal/host-expired-subscriber/src/index.ts",
  userExpiredSubscriber:
    "../../../../lambda/handlers/subscribers/internal/user-expired-subscriber/src/index.ts",
  roomRemovedSubscriber:
    "../../../../lambda/handlers/subscribers/internal/room-removed-subscriber/src/index.ts",
  userJoinedSubscriber:
    "../../../../lambda/handlers/subscribers/internal/user-joined-subscriber/src/index.ts",
  userLeftSubscriber:
    "../../../../lambda/handlers/subscribers/internal/user-left-subscriber/src/index.ts",
  hostChangedSubscriber:
    "../../../../lambda/handlers/subscribers/internal/host-changed-subscriber/src/index.ts",
  gameInitializedSubscriber:
    "../../../../lambda/handlers/subscribers/external/game-initialized-subscriber/src/index.ts",
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
  gameInitializedSubscriber: "handler",
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
  gameInitialization: "room-receive.game-initialized",
};
