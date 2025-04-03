import {
  TransactWriteItemsCommand,
  TransactWriteItemsCommandInput,
} from "@aws-sdk/client-dynamodb";

import { Room } from "/opt/nodejs/oigamez-core";
import { dbClient } from "/opt/nodejs/oigamez-data";

import { removeUserConnection, updateRoomUserCount } from "../transact-writes";

export const removeUserFromRoom = async (
  room: Room,
  username: string
): Promise<void> => {
  const transactWriteItemsCommandInput: TransactWriteItemsCommandInput = {
    TransactItems: [
      removeUserConnection(room.code, username),
      updateRoomUserCount(room, -1),
    ],
  };

  const transactWriteItemsCommand = new TransactWriteItemsCommand(
    transactWriteItemsCommandInput
  );

  await dbClient.send(transactWriteItemsCommand);
};
