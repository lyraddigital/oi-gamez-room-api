import {
  TransactWriteItem,
  TransactWriteItemsCommand,
  TransactWriteItemsCommandInput,
} from "@aws-sdk/client-dynamodb";

import { dbClient } from "@oigamez/dynamodb";
import { Room, User } from "@oigamez/models";
import {
  removeRoom,
  removeRoomUser,
  removeUserConnection,
} from "../transact-writes";

export const clearRoomData = async (
  room: Room,
  users: User[]
): Promise<void> => {
  const userTransactWriteItems: TransactWriteItem[] = users.map((u) =>
    removeRoomUser(room.code, u.username)
  );
  const userConnectionWriteItems: TransactWriteItem[] = users.map((u) =>
    removeUserConnection(room.code, u.username)
  );

  const transactWriteItemsCommandInput: TransactWriteItemsCommandInput = {
    TransactItems: [
      removeRoom(room.code),
      ...userTransactWriteItems,
      ...userConnectionWriteItems,
    ],
  };

  const transactWriteItemsCommand = new TransactWriteItemsCommand(
    transactWriteItemsCommandInput
  );

  await dbClient.send(transactWriteItemsCommand);
};
