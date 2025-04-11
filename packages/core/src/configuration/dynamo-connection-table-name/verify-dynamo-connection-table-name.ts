import { CONNECTION_DYNAMO_TABLE_NAME } from "./dynamo-connection-table-name.js";

export const verifyDynamoConnectionTableName = (): void => {
  if (!CONNECTION_DYNAMO_TABLE_NAME) {
    throw new Error(
      "CONNECTION_DYNAMO_TABLE_NAME environment variable is not set"
    );
  }
};
