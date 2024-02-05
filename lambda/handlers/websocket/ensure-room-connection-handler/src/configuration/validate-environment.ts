import {
  verifyDynamoTableName,
  verifyDynamoConnectionTableName,
  verifyUpdatedConnectWindowInSeconds,
  verifyEbName,
  verifyEbInternalEventSourceName,
  verifyExternalEbName,
  verifyEbExternalEventSourceName,
} from "@oigamez/configuration";

export const validateEnvironment = (): void => {
  verifyDynamoTableName();
  verifyDynamoConnectionTableName();
  verifyUpdatedConnectWindowInSeconds();
  verifyEbName();
  verifyEbInternalEventSourceName();
  verifyExternalEbName();
  verifyEbExternalEventSourceName();
};
