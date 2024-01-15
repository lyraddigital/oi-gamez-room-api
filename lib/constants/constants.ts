interface EnvironmentVariables {
  getGameTypes: GetGameTypesEnvironmentVariables;
  createRoom: CreateRoomEnvironmentVariables;
  getRoomStatus: GetRoomStatusEnvironmentVariables;
  joinRoom: JoinRoomEnvironmentVariables;
  leaveRoom: LeaveRoomEnvironmentVariables;
  ensureRoomConnection: EnsureRoomEnvironmentVariables;
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

interface GetRoomStatusEnvironmentVariables {
  tableName: string;
  corsAllowedOrigins: string;
}

interface JoinRoomEnvironmentVariables {
  tableName: string;
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

interface HandlerFilePaths {
  getGameTypes: string;
  createRoom: string;
  getRoomStatus: string;
  joinRoom: string;
  leaveRoom: string;
  ensureRoomConnection: string;
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
}

interface IndexNames {
  hostedRooms: string;
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
  getRoomStatus: {
    tableName: "DYNAMO_TABLE_NAME",
    corsAllowedOrigins: "CORS_ALLOWED_ORIGINS",
  },
  joinRoom: {
    tableName: "DYNAMO_TABLE_NAME",
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
};

export const HandlerFilePaths: HandlerFilePaths = {
  getGameTypes:
    "../../../lambda/handlers/rest/get-game-types-handler/src/index.ts",
  createRoom: "../../../lambda/handlers/rest/create-room-handler/src/index.ts",
  getRoomStatus:
    "../../../lambda/handlers/rest/get-room-status-handler/src/index.ts",
  joinRoom: "../../../lambda/handlers/rest/join-room-handler/src/index.ts",
  leaveRoom: "../../../lambda/handlers/rest/leave-room-handler/src/index.ts",
  ensureRoomConnection:
    "../../../lambda/handlers/websocket/ensure-room-connection-handler/src/index.ts",
};

export const HandlerFunctionNames: HandlerFunctionNames = {
  getGameTypes: "handler",
  createRoom: "handler",
  getRoomStatus: "handler",
  joinRoom: "handler",
  leaveRoom: "handler",
  ensureRoomConnection: "handler",
};

export const IndexNames: IndexNames = {
  hostedRooms: "HostedRooms-index",
};
