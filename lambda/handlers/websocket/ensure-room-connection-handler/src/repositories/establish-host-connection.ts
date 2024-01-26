import {
  TransactWriteItem,
  TransactWriteItemsCommand,
  TransactWriteItemsCommandInput,
} from "@aws-sdk/client-dynamodb";

import { UPDATED_CONNECT_WINDOW_IN_SECONDS } from "@oigamez/configuration";
import { dbClient } from "@oigamez/dynamodb";
import { Room } from "@oigamez/models";

import {
  createOrUpdateRoomConnection,
  updateRoomHostDetails,
} from "./transact-writes";

export const establishHostConnection = async (
  room: Room,
  username: string,
  connectionId: string,
  isFirstHostConnection: boolean,
  updatedTTL: number
): Promise<void> => {
  const adjustedTTL = isFirstHostConnection
    ? updatedTTL + UPDATED_CONNECT_WINDOW_IN_SECONDS
    : room!.epochExpiry;

  const transactionWriteItems: TransactWriteItem[] = [
    createOrUpdateRoomConnection(room, username, connectionId, adjustedTTL),
  ];

  if (isFirstHostConnection) {
    transactionWriteItems.push(updateRoomHostDetails(room, adjustedTTL));
  }

  const transactWriteItemsCommandInput: TransactWriteItemsCommandInput = {
    TransactItems: transactionWriteItems,
  };

  const command = new TransactWriteItemsCommand(transactWriteItemsCommandInput);

  await dbClient.send(command);
};
