import { TransactWriteItem } from "@aws-sdk/client-dynamodb";

import { DYNAMO_TABLE_NAME } from "/opt/nodejs/oigamez-core.js";
import { keys } from "../../dynamodb/index.js";

export const removeRoom = (roomCode: string): TransactWriteItem => {
  return {
    Delete: {
      TableName: DYNAMO_TABLE_NAME,
      Key: keys.room(roomCode),
    },
  };
};
