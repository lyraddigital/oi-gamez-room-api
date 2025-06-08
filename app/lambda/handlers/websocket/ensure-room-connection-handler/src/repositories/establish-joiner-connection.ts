import {
  TransactWriteItem,
  TransactWriteItemsCommand,
  TransactWriteItemsCommandInput,
} from "@aws-sdk/client-dynamodb";

import { Room, RoomStatus } from "@oigamez/core";
import { dbClient } from "@oigamez/data";

import {
  createOrUpdateRoomConnection,
  updateRoomUserCount,
} from "./transact-writes";

export const establishJoinerConnection = async (
  room: Room,
  username: string,
  connectionId: string
): Promise<void> => {
  const transactionWriteItems: TransactWriteItem[] = [
    createOrUpdateRoomConnection(
      room,
      username,
      connectionId,
      room.epochExpiry
    ),
  ];

  if (room.status === RoomStatus.available) {
    transactionWriteItems.push(updateRoomUserCount(room));
  }

  const transactWriteItemsCommandInput: TransactWriteItemsCommandInput = {
    TransactItems: transactionWriteItems,
  };

  const command = new TransactWriteItemsCommand(transactWriteItemsCommandInput);

  await dbClient.send(command);
};
