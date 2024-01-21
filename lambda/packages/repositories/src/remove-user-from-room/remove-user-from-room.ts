import {
  TransactWriteItemsCommand,
  TransactWriteItemsCommandInput,
} from "@aws-sdk/client-dynamodb";

import { dbClient } from "@oigamez/dynamodb";
import { Room } from "@oigamez/models";

import { removeUserConnection, updateRoomUserCount } from "../transact-writes";

export const removeUserFromRoom = async (
  room: Room,
  username: string
): Promise<void> => {
  const transactWriteItemsCommandInput: TransactWriteItemsCommandInput = {
    TransactItems: [
      removeUserConnection(room.code, username),
      updateRoomUserCount(room.code, -1),
    ],
  };

  const transactWriteItemsCommand = new TransactWriteItemsCommand(
    transactWriteItemsCommandInput
  );

  await dbClient.send(transactWriteItemsCommand);
};
