import { TransactWriteItem } from "@aws-sdk/client-dynamodb";

import { CONNECTION_DYNAMO_TABLE_NAME } from "@oigamez/core";
import { keys } from "../../dynamodb/index.js";

export const removeUserConnection = (
  roomCode: string,
  username: string
): TransactWriteItem => {
  return {
    Delete: {
      TableName: CONNECTION_DYNAMO_TABLE_NAME,
      Key: keys.connection(roomCode, username),
    },
  };
};
