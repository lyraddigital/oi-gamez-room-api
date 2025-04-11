import { CONNECTION_DYNAMO_INDEX_NAME } from "./dynamo-connection-index-name.js";

export const verifyDynamoConnectionIndexName = (): void => {
  if (!CONNECTION_DYNAMO_INDEX_NAME) {
    throw new Error(
      "CONNECTION_DYNAMO_INDEX_NAME environment variable is not set"
    );
  }
};
