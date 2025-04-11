import { verifyDynamoConnectionTableName } from "/opt/nodejs/oigamez-core.js";
import { verifyDynamoConnectionIndexName } from "./dynamo-connection-index-name/index.js";

export const validateEnvironment = (): void => {
  verifyDynamoConnectionTableName();
  verifyDynamoConnectionIndexName();
};
