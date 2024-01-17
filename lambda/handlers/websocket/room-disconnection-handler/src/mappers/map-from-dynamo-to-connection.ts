import { AttributeValue } from "@aws-sdk/client-dynamodb";

import { dynamoFieldNames, getDynamoString } from "@oigamez/dynamodb";

import { RoomConnection } from "../models";

export const mapFromDynamoToConnection = (
  dynamoRecord: Record<string, AttributeValue>
): RoomConnection => ({
  connectionId: getDynamoString(
    dynamoRecord[dynamoFieldNames.connection.connectionId]
  ),
  roomCode: getDynamoString(dynamoRecord[dynamoFieldNames.connection.roomCode]),
  username: getDynamoString(dynamoRecord[dynamoFieldNames.connection.username]),
});
