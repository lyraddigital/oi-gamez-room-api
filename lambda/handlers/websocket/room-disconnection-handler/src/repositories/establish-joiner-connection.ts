import {
  TransactWriteItem,
  TransactWriteItemsCommand,
  TransactWriteItemsCommandInput,
} from "@aws-sdk/client-dynamodb";

import { dbClient } from "@oigamez/dynamodb";
import { Room, RoomStatus } from "@oigamez/models";

import { createOrUpdateRoomConnection } from "./get-connection-by-id";
import { updateUserTTL } from "./update-user-ttl";
import { updateRoomUserCount } from "./update-room-user-count";

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

  if (room.status === RoomStatus.Available) {
    transactionWriteItems.push(updateUserTTL(room, username, room.epochExpiry));
    transactionWriteItems.push(updateRoomUserCount(room));
  }

  const transactWriteItemsCommandInput: TransactWriteItemsCommandInput = {
    TransactItems: transactionWriteItems,
  };

  const command = new TransactWriteItemsCommand(transactWriteItemsCommandInput);

  await dbClient.send(command);
};
