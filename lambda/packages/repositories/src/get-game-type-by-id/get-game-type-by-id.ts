import { GetItemCommand, GetItemCommandInput } from "@aws-sdk/client-dynamodb";

import { DYNAMO_TABLE_NAME } from "@oigamez/configuration";
import { dbClient, keys } from "@oigamez/dynamodb";

import { mapFromDynamoToGameType } from "@oigamez/mappers";
import { GameType } from "@oigamez/models";

export const getGameTypeById = async (
  gameTypeId: number
): Promise<GameType | undefined> => {
  const getItemCommandInput: GetItemCommandInput = {
    TableName: DYNAMO_TABLE_NAME,
    Key: keys.gameType(gameTypeId),
  };

  const command = new GetItemCommand(getItemCommandInput);
  const response = await dbClient.send(command);

  if (!response?.Item) {
    return undefined;
  }

  return mapFromDynamoToGameType(response.Item);
};
