import { ScanCommand } from "@aws-sdk/client-dynamodb";

import {
  CONNECTION_DYNAMO_TABLE_NAME,
  RoomConnection,
} from "/opt/nodejs/oigamez-core";
import {
  dbClient,
  dynamoFieldNames,
  dynamoFieldValues,
  mapFromDynamoToConnection,
} from "/opt/nodejs/oigamez-data";
import {
  CONNECTION_DYNAMO_LAST_DISCONNECTED_INDEX_NAME,
  EXPIRED_DISCONNECTION_WINDOW_IN_SECONDS,
} from "../configuration";

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
