import { QueryCommand, QueryCommandInput } from "@aws-sdk/client-dynamodb";

import { CONNECTION_DYNAMO_TABLE_NAME } from "@oigamez/configuration";
import {
  dbClient,
  dynamoFieldNames,
  dynamoFieldValues,
} from "@oigamez/dynamodb";
import { mapFromDynamoToConnection } from "@oigamez/mappers";
import { RoomConnection } from "@oigamez/models";

export const getRoomConnections = async (
  roomCode: string,
  ttl: number
): Promise<RoomConnection[]> => {
  const input: QueryCommandInput = {
    TableName: CONNECTION_DYNAMO_TABLE_NAME,
    KeyConditionExpression: "#pk = :pk",
    FilterExpression: "#ttl > :ttl",
    ExpressionAttributeNames: {
      "#pk": dynamoFieldNames.connection.pk,
      "#ttl": dynamoFieldNames.connection.ttl,
    },
    ExpressionAttributeValues: {
      ":pk": dynamoFieldValues.connection.pk(roomCode),
      ":ttl": dynamoFieldValues.connection.ttl(ttl),
    },
  };

  const command = new QueryCommand(input);
  const response = await dbClient.send(command);

  if (!response?.Items || response.Items.length <= 0) {
    return [];
  }

  return response.Items.map(mapFromDynamoToConnection);
};
