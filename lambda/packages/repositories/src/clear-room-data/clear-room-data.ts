import {
  TransactWriteItem,
  TransactWriteItemsCommand,
  TransactWriteItemsCommandInput,
} from "@aws-sdk/client-dynamodb";

import { dbClient } from "@oigamez/dynamodb";
import { RoomConnection } from "@oigamez/models";
import { removeRoom, removeUserConnection } from "../transact-writes";

export const clearRoomData = async (
  roomCode: string,
  connections: RoomConnection[]
): Promise<void> => {
  const connectionWriteItems: TransactWriteItem[] = connections.map((u) =>
    removeUserConnection(roomCode, u.username)
  );

  const transactWriteItemsCommandInput: TransactWriteItemsCommandInput = {
    TransactItems: [removeRoom(roomCode), ...connectionWriteItems],
  };

  const transactWriteItemsCommand = new TransactWriteItemsCommand(
    transactWriteItemsCommandInput
  );

  await dbClient.send(transactWriteItemsCommand);
};
