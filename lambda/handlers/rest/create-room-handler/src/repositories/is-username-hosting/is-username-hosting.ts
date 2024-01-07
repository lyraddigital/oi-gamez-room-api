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

export const isUsernameHosting = async (username: string): Promise<boolean> => {
  const queryIndexCommand: QueryCommandInput = {
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

  const command = new QueryCommand(queryIndexCommand);
  const response = await dbClient.send(command);

  return !!response?.Items?.length && response.Items.length > 0;
};
