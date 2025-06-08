import { verifyDynamoConnectionTableName } from "@oigamez/core";

import { verifyDynamoConnectionIndexName } from "./dynamo-connection-index-name";

export const validateEnvironment = (): void => {
  verifyDynamoConnectionTableName();
  verifyDynamoConnectionIndexName();
};
