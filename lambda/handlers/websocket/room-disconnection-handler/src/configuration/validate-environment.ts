import {
  verifyDynamoConnectionIndexName,
  verifyDynamoConnectionTableName,
} from "@oigamez/configuration";

export const validateEnvironment = (): void => {
  verifyDynamoConnectionTableName();
  verifyDynamoConnectionIndexName();
};
