import { CONNECTION_DYNAMO_LAST_DISCONNECTED_INDEX_NAME } from "./dynamo-last-disconnected-index-name";

export const verifyDynamoLastDisconnectedIndexName = (): void => {
  if (!CONNECTION_DYNAMO_LAST_DISCONNECTED_INDEX_NAME) {
    throw new Error(
      "CONNECTION_DYNAMO_LAST_DISCONNECTED_INDEX_NAME environment variable is not set"
    );
  }
};
