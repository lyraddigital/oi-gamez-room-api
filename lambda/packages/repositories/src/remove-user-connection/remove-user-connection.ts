import {
  TransactWriteItemsCommand,
  TransactWriteItemsCommandInput,
} from "@aws-sdk/client-dynamodb";

import { dbClient } from "@oigamez/dynamodb";

import {
  updateRoomUserCount,
  removeUserConnection as dbRemoveUserConnection,
} from "../transact-writes";

export const removeUserConnection = async (
  roomCode: string,
  username: string
): Promise<void> => {
  const transactWriteItemsCommandInput: TransactWriteItemsCommandInput = {
    TransactItems: [
      dbRemoveUserConnection(roomCode, username),
      updateRoomUserCount(roomCode, -1),
    ],
  };

  const transactWriteItemsCommand = new TransactWriteItemsCommand(
    transactWriteItemsCommandInput
  );

  await dbClient.send(transactWriteItemsCommand);
};
