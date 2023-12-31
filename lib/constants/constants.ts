interface EnvironmentVariables {
  getGameTypes: GetGameTypesEnvironmentVariables;
  createRoom: CreateRoomEnvironmentVariables;
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
  sessionCookieName: string;
  sessionCookieDomain: string;
  hostRoomIndexName: string;
}

interface EnsureRoomEnvironmentVariables {
  tableName: string;
}

interface HandlerFilePaths {
  getGameTypes: string;
  createRoom: string;
  ensureRoomConnection: string;
}

interface ResourcePaths {
  gameTypes: string;
  rooms: string;
}

interface HandlerFunctionNames {
  getGameTypes: string;
  createRoom: string;
  ensureRoomConnection: string;
}

interface IndexNames {
  hostedRooms: string;
}

export const ResourcePaths: ResourcePaths = {
  gameTypes: "game-types",
  rooms: "rooms",
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
    sessionCookieName: "COOKIE_NAME",
    sessionCookieDomain: "COOKIE_DOMAIN",
    hostRoomIndexName: "HOST_ROOM_INDEX_NAME",
  },
  ensureRoomConnection: {
    tableName: "DYNAMO_TABLE_NAME",
  },
};

export const HandlerFilePaths: HandlerFilePaths = {
  getGameTypes:
    "../../../lambda/handlers/rest/get-game-types-handler/src/index.ts",
  createRoom: "../../../lambda/handlers/rest/create-room-handler/src/index.ts",
  ensureRoomConnection:
    "../../../lambda/handlers/websocket/ensure-room-connection-handler/src/index.ts",
};

export const HandlerFunctionNames: HandlerFunctionNames = {
  getGameTypes: "handler",
  createRoom: "handler",
  ensureRoomConnection: "handler",
};

export const IndexNames: IndexNames = {
  hostedRooms: "HostedRooms-index",
};
