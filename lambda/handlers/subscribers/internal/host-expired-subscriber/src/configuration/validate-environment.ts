import {
  verifyDynamoConnectionTableName,
  verifyEbName,
  verifyEbInternalEventSourceName,
} from "/opt/nodejs/oigamez-core";

export const validateEnvironment = (): void => {
  verifyDynamoConnectionTableName();
  verifyEbName();
  verifyEbInternalEventSourceName();
};
