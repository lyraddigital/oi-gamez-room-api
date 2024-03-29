import { QueryCommand, QueryCommandInput } from "@aws-sdk/client-dynamodb";

import {
  DYNAMO_TABLE_NAME,
  HOST_ROOM_INDEX_NAME,
} from "@oigamez/configuration";
import {
  dbClient,
  dynamoFieldNames,
  dynamoFieldValues,
} from "@oigamez/dynamodb";
import { GameType } from "@oigamez/models";
import { getGameTypeById } from "@oigamez/repositories";

export const getRoomHostingData = async (
  gameTypeId: number,
  username: string
): Promise<[GameType | undefined, boolean]> => {
  const queryIndexCommandInput: QueryCommandInput = {
    TableName: DYNAMO_TABLE_NAME,
    IndexName: HOST_ROOM_INDEX_NAME,
    KeyConditionExpression: "#hostUsername = :hostUsername",
    ExpressionAttributeNames: {
      "#hostUsername": dynamoFieldNames.room.hostUsername,
    },
    ExpressionAttributeValues: {
      ":hostUsername": dynamoFieldValues.room.hostUsername(username),
    },
  };

  const gameType = await getGameTypeById(gameTypeId);
  const queryIndexCommand = new QueryCommand(queryIndexCommandInput);
  const queryResponse = await dbClient.send(queryIndexCommand);

  const isHosting =
    !!queryResponse?.Items?.length && queryResponse.Items.length > 0;

  return [gameType, isHosting];
};
