import { QueryCommandInput, QueryCommand } from "@aws-sdk/client-dynamodb";

import {
  dbClient,
  dynamoFieldNames,
  dynamoFieldValues,
} from "@oigamez/dynamodb";

import { mapFromDynamoToGameType } from "@oigamez/mappers";
import { DYNAMO_TABLE_NAME, GameType } from "/opt/nodejs/oigamez-core";

export const getAllGameTypes = async (): Promise<GameType[]> => {
  const queryCommandInput: QueryCommandInput = {
    TableName: DYNAMO_TABLE_NAME,
    KeyConditionExpression: "#pk = :pk",
    ExpressionAttributeNames: {
      "#pk": dynamoFieldNames.common.pk,
    },
    ExpressionAttributeValues: {
      ":pk": dynamoFieldValues.gameTypes.pk,
    },
  };

  const command = new QueryCommand(queryCommandInput);
  const response = await dbClient.send(command);

  if (!response?.Items?.length) {
    return [];
  }

  return response.Items.map(mapFromDynamoToGameType);
};
