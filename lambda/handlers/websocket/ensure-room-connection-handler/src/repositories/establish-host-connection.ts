import {
  TransactWriteItem,
  TransactWriteItemsCommand,
  TransactWriteItemsCommandInput,
} from "@aws-sdk/client-dynamodb";

import { UPDATED_CONNECT_WINDOW_IN_SECONDS } from "@oigamez/configuration";
import { dbClient } from "@oigamez/dynamodb";
import { Room, RoomStatus } from "@oigamez/models";

import { createOrUpdateRoomConnection } from "./create-or-update-room-connection";
import { updateRoomHostDetails } from "./update-room-host-details";
import { updateUserTTL } from "./update-user-ttl";

export const establishHostConnection = async (
  room: Room,
  username: string,
  connectionId: string,
  updatedTTL: number
): Promise<void> => {
  const isFirstHostConnection = room.status === RoomStatus.NotAvailable;
  const adjustedTTL = isFirstHostConnection
    ? updatedTTL + UPDATED_CONNECT_WINDOW_IN_SECONDS
    : room!.epochExpiry;

  const transactionWriteItems: TransactWriteItem[] = [
    createOrUpdateRoomConnection(room, username, connectionId, adjustedTTL),
  ];

  if (isFirstHostConnection) {
    transactionWriteItems.push(updateRoomHostDetails(room, adjustedTTL));
    transactionWriteItems.push(updateUserTTL(room, username, adjustedTTL));
  }

  const transactWriteItemsCommandInput: TransactWriteItemsCommandInput = {
    TransactItems: transactionWriteItems,
  };

  const command = new TransactWriteItemsCommand(transactWriteItemsCommandInput);

  await dbClient.send(command);
};