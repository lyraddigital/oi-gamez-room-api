import {
  TransactWriteItemsCommand,
  TransactWriteItemsCommandInput,
} from "@aws-sdk/client-dynamodb";

import { dbClient } from "@oigamez/dynamodb";
import { Room } from "@oigamez/models";

import {
  updateRoomUserCount,
  removeUserConnection as dbRemoveUserConnection,
} from "../transact-writes";

export const removeUserConnection = async (
  room: Room,
  username: string
): Promise<void> => {
  const transactWriteItemsCommandInput: TransactWriteItemsCommandInput = {
    TransactItems: [
      dbRemoveUserConnection(room.code, username),
      updateRoomUserCount(room, -1),
    ],
  };

  const transactWriteItemsCommand = new TransactWriteItemsCommand(
    transactWriteItemsCommandInput
  );

  await dbClient.send(transactWriteItemsCommand);
};
