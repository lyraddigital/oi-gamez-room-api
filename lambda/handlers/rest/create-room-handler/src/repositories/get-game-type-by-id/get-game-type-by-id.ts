import { GetItemCommand, GetItemCommandInput } from "@aws-sdk/client-dynamodb";
import { mapFromDynamoToGameType } from "@oigamez/mappers";

import { DYNAMO_TABLE_NAME, GameType } from "/opt/nodejs/oigamez-core";
import { dbClient, keys } from "/opt/nodejs/oigamez-data";

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
