import {
  GetItemCommand,
  GetItemCommandInput,
  QueryCommand,
  QueryCommandInput,
} from "@aws-sdk/client-dynamodb";

import {
  DYNAMO_TABLE_NAME,
  HOST_ROOM_INDEX_NAME,
} from "@oigamez/configuration";
import {
  dbClient,
  dynamoFieldNames,
  dynamoFieldValues,
  keys,
} from "@oigamez/dynamodb";
import { mapFromDynamoToGameType } from "@oigamez/mappers";
import { GameType } from "@oigamez/models";

export const getRoomHostingData = async (
  gameTypeId: number,
  username: string
): Promise<[GameType | undefined, boolean]> => {
  const getItemCommandInput: GetItemCommandInput = {
    TableName: DYNAMO_TABLE_NAME,
    Key: keys.gameType(gameTypeId),
  };

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

  const getItemCommand = new GetItemCommand(getItemCommandInput);
  const queryIndexCommand = new QueryCommand(queryIndexCommandInput);
  const getItemResponse = await dbClient.send(getItemCommand);
  const queryResponse = await dbClient.send(queryIndexCommand);
  const gameType = !!getItemResponse?.Item
    ? mapFromDynamoToGameType(getItemResponse.Item)
    : undefined;
  const isHosting =
    !!queryResponse?.Items?.length && queryResponse.Items.length > 0;

  return [gameType, isHosting];
};
