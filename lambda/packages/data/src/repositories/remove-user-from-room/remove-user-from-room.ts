import {
  TransactWriteItemsCommand,
  TransactWriteItemsCommandInput,
} from "@aws-sdk/client-dynamodb";

import { Room } from "/opt/nodejs/oigamez-core.js";
import { dbClient } from "../../dynamodb/index.js";
import {
  removeUserConnection,
  updateRoomUserCount,
} from "../transact-writes/index.js";

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
