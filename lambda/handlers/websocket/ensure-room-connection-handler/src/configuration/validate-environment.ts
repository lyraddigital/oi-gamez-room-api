import {
  verifyDynamoTableName,
  verifyDynamoConnectionTableName,
  verifyUpdatedConnectWindowInSeconds,
  verifyEbName,
  verifyEbInternalEventSourceName,
} from "@oigamez/configuration";

export const validateEnvironment = (): void => {
  verifyDynamoTableName();
  verifyDynamoConnectionTableName();
  verifyUpdatedConnectWindowInSeconds();
  verifyEbName();
  verifyEbInternalEventSourceName();
};
