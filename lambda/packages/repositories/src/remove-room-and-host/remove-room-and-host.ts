import {
  TransactWriteItemsCommand,
  TransactWriteItemsCommandInput,
} from "@aws-sdk/client-dynamodb";

import { dbClient } from "@oigamez/dynamodb";
import { removeRoom, removeUserConnection } from "../transact-writes";

export const removeRoomAndHost = async (
  roomCode: string,
  hostUsername: string
): Promise<void> => {
  const transactWriteItemsCommandInput: TransactWriteItemsCommandInput = {
    TransactItems: [
      removeUserConnection(roomCode, hostUsername),
      removeRoom(roomCode),
    ],
  };

  const transactWriteItemsCommand = new TransactWriteItemsCommand(
    transactWriteItemsCommandInput
  );

  await dbClient.send(transactWriteItemsCommand);
};
