import { TransactWriteItem } from "@aws-sdk/client-dynamodb";

import { DYNAMO_TABLE_NAME } from "/opt/nodejs/oigamez-core";
import { keys } from "@oigamez/dynamodb";

export const removeRoom = (roomCode: string): TransactWriteItem => {
  return {
    Delete: {
      TableName: DYNAMO_TABLE_NAME,
      Key: keys.room(roomCode),
    },
  };
};
