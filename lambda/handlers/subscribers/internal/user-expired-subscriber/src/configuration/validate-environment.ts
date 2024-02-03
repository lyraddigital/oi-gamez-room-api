import {
  verifyDynamoConnectionTableName,
  verifyEbName,
  verifyEbInternalEventSourceName,
} from "@oigamez/configuration";

export const validateEnvironment = (): void => {
  verifyDynamoConnectionTableName();
  verifyEbName();
  verifyEbInternalEventSourceName();
};
