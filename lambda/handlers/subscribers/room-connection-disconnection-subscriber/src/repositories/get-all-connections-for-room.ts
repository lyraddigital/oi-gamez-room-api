import { QueryCommand, QueryCommandInput } from "@aws-sdk/client-dynamodb";

import { CONNECTION_DYNAMO_TABLE_NAME } from "@oigamez/configuration";
import {
  dbClient,
  dynamoFieldNames,
  dynamoFieldValues,
} from "@oigamez/dynamodb";
import { mapFromDynamoToConnection } from "@oigamez/mappers";
import { RoomConnection } from "@oigamez/models";

export const getAllConnectionsForRoom = async (
  roomCode: string
): Promise<RoomConnection[]> => {
  const queryCommandInput: QueryCommandInput = {
    TableName: CONNECTION_DYNAMO_TABLE_NAME,
    KeyConditionExpression: "#pk = :pk",
    ExpressionAttributeNames: {
      "#pk": dynamoFieldNames.connection.pk,
    },
    ExpressionAttributeValues: {
      ":pk": dynamoFieldValues.connection.pk(roomCode),
    },
  };

  const queryCommand = new QueryCommand(queryCommandInput);
  const response = await dbClient.send(queryCommand);

  if (!response?.Items) {
    return [];
  }

  return response.Items.map(mapFromDynamoToConnection);
};
