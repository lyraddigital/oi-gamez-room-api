import { verifyDynamoConnectionTableName } from "@oigamez/configuration";

import { verifyDynamoConnectionIndexName } from "./dynamo-connection-index-name";

export const validateEnvironment = (): void => {
  verifyDynamoConnectionTableName();
  verifyDynamoConnectionIndexName();
};
