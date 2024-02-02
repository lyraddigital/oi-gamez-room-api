import {
  verifyDynamoConnectionTableName,
  verifyEbName,
  verifyEbEventSourceName,
} from "@oigamez/configuration";

export const validateEnvironment = (): void => {
  verifyDynamoConnectionTableName();
  verifyEbName();
  verifyEbEventSourceName();
};
