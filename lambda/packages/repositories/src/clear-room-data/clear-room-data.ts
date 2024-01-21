import {
  TransactWriteItem,
  TransactWriteItemsCommand,
  TransactWriteItemsCommandInput,
} from "@aws-sdk/client-dynamodb";

import { dbClient } from "@oigamez/dynamodb";
import { Room, RoomConnection } from "@oigamez/models";
import { removeRoom, removeUserConnection } from "../transact-writes";

export const clearRoomData = async (
  room: Room,
  connections: RoomConnection[]
): Promise<void> => {
  const connectionWriteItems: TransactWriteItem[] = connections.map((u) =>
    removeUserConnection(room.code, u.username)
  );

  const transactWriteItemsCommandInput: TransactWriteItemsCommandInput = {
    TransactItems: [removeRoom(room.code), ...connectionWriteItems],
  };

  const transactWriteItemsCommand = new TransactWriteItemsCommand(
    transactWriteItemsCommandInput
  );

  await dbClient.send(transactWriteItemsCommand);
};
