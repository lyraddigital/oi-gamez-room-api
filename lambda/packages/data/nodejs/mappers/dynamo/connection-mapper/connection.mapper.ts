import { AttributeValue } from "@aws-sdk/client-dynamodb";

import { RoomConnection } from "/opt/nodejs/oigamez-core";
import {
  dynamoFieldNames,
  getOptionalDynamoInt,
  getDynamoString,
} from "/opt/nodejs/oigamez-data";

export const mapFromDynamoToConnection = (
  dynamoRecord: Record<string, AttributeValue>
): RoomConnection => ({
  connectionId: getDynamoString(
    dynamoRecord[dynamoFieldNames.connection.connectionId]
  ),
  roomCode: getDynamoString(dynamoRecord[dynamoFieldNames.connection.roomCode]),
  username: getDynamoString(dynamoRecord[dynamoFieldNames.connection.username]),
  lastDisconnected: getOptionalDynamoInt(
    dynamoRecord[dynamoFieldNames.connection.lastDisconnected]
  ),
});
