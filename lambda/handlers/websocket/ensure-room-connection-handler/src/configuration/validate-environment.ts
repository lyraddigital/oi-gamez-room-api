import {
  verifyDynamoTableName,
  verifyDynamoConnectionTableName,
  verifyUpdatedConnectWindowInSeconds,
} from "@oigamez/configuration";

export const validateEnvironment = (): void => {
  verifyDynamoTableName();
  verifyDynamoConnectionTableName();
  verifyUpdatedConnectWindowInSeconds();
};
