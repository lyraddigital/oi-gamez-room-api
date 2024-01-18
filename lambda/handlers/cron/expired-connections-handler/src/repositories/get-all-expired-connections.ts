import { ScanCommand } from "@aws-sdk/client-dynamodb";
import {
  CONNECTION_DYNAMO_LAST_DISCONNECTED_INDEX_NAME,
  CONNECTION_DYNAMO_TABLE_NAME,
  EXPIRED_DISCONNECTION_WINDOW_IN_SECONDS,
} from "@oigamez/configuration";

import {
  dbClient,
  dynamoFieldNames,
  dynamoFieldValues,
} from "@oigamez/dynamodb";
import { mapFromDynamoToConnection } from "@oigamez/mappers";
import { RoomConnection } from "@oigamez/models";

export const getAllExpiredConnections = async (
  currentTime: number
): Promise<RoomConnection[]> => {
  const nextLastDisconnectedExpiration =
    currentTime - EXPIRED_DISCONNECTION_WINDOW_IN_SECONDS;

  const scanCommand = new ScanCommand({
    TableName: CONNECTION_DYNAMO_TABLE_NAME,
    IndexName: CONNECTION_DYNAMO_LAST_DISCONNECTED_INDEX_NAME,
    FilterExpression: "#lastDisconnected < :nextLastDisconnectedExpiration",
    ExpressionAttributeNames: {
      "#lastDisconnected": dynamoFieldNames.connection.lastDisconnected,
    },
    ExpressionAttributeValues: {
      ":nextLastDisconnectedExpiration":
        dynamoFieldValues.connection.lastDisconnected(
          nextLastDisconnectedExpiration
        ),
    },
  });

  const response = await dbClient.send(scanCommand);

  if (!response?.Items) {
    return [];
  }

  return response.Items.map(mapFromDynamoToConnection);
};
