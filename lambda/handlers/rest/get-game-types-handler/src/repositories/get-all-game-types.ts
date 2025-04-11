import { QueryCommandInput, QueryCommand } from "@aws-sdk/client-dynamodb";

import { DYNAMO_TABLE_NAME, GameType } from "/opt/nodejs/oigamez-core.js";
import {
  dbClient,
  dynamoFieldNames,
  dynamoFieldValues,
  mapFromDynamoToGameType,
} from "/opt/nodejs/oigamez-data.js";

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
