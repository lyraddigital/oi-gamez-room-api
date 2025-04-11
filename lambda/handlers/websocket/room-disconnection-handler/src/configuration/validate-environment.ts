import { verifyDynamoConnectionTableName } from "@oigamez/core";
import { verifyDynamoConnectionIndexName } from "./dynamo-connection-index-name/index.js";

export const validateEnvironment = (): void => {
  verifyDynamoConnectionTableName();
  verifyDynamoConnectionIndexName();
};
