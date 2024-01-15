import { TransactWriteItem } from "@aws-sdk/client-dynamodb";
import { DYNAMO_TABLE_NAME } from "@oigamez/configuration";

import { keys } from "@oigamez/dynamodb";

export const removeRoomUser = (
  roomCode: string,
  username: string
): TransactWriteItem => {
  return {
    Delete: {
      TableName: DYNAMO_TABLE_NAME,
      Key: keys.user(roomCode, username),
    },
  };
};
