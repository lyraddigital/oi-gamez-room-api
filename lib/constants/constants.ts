interface EnvironmentVariables {
  getGameTypes: GetGameTypesEnvironmentVariables;
}

interface GetGameTypesEnvironmentVariables {
  tableName: string;
  corsAllowedOrigins: string;
}

interface HandlerFilePaths {
  getGameTypes: string;
}

interface ResourcePaths {
  gameTypes: string;
}

interface HandlerFunctionNames {
  getGameTypes: string;
}
export const ResourcePaths: ResourcePaths = {
  gameTypes: "game-types",
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
};

export const HandlerFunctionNames: HandlerFunctionNames = {
  getGameTypes: "handler",
};
