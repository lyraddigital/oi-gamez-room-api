import {
  verifyDynamoTableName,
  verifyDynamoConnectionTableName,
  verifyUpdatedConnectWindowInSeconds,
  verifyRoomSocketApiEndpoint,
} from "@oigamez/configuration";

export const validateEnvironment = (): void => {
  verifyDynamoTableName();
  verifyDynamoConnectionTableName();
  verifyUpdatedConnectWindowInSeconds();
  verifyRoomSocketApiEndpoint();
};
