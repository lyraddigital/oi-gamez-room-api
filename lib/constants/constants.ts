interface EnvironmentVariables {
  getGameTypes: GetGameTypesEnvironmentVariables;
}

interface GetGameTypesEnvironmentVariables {
  tableName: string;
  corsAllowedOrigins: string;
}

interface HandlerFilePaths {
  getGameTypes: string;
  createRoom: string;
}

interface ResourcePaths {
  gameTypes: string;
  rooms: string;
}

interface HandlerFunctionNames {
  getGameTypes: string;
  createRoom: string;
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
};

export const HandlerFilePaths: HandlerFilePaths = {
  getGameTypes:
    "../../../lambda/handlers/rest/get-game-types-handler/src/index.ts",
  createRoom: "../../../lambda/handlers/rest/create-room-handler/src/index.ts",
};

export const HandlerFunctionNames: HandlerFunctionNames = {
  getGameTypes: "handler",
  createRoom: "handler",
};
