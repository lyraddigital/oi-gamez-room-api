import {
  verifyDynamoConnectionTableName,
  verifyEbName,
  verifyEbInternalEventSourceName,
} from "@oigamez/core";

export const validateEnvironment = (): void => {
  verifyDynamoConnectionTableName();
  verifyEbName();
  verifyEbInternalEventSourceName();
};
