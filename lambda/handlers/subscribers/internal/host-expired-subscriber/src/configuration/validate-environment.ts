import {
  verifyDynamoConnectionTableName,
  verifyEbName,
  verifyEbInternalEventSourceName,
} from "/opt/nodejs/oigamez-core.js";

export const validateEnvironment = (): void => {
  verifyDynamoConnectionTableName();
  verifyEbName();
  verifyEbInternalEventSourceName();
};
