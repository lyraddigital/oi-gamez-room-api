import { TransactWriteItem } from "@aws-sdk/client-dynamodb";
import { dynamoFieldNames, dynamoFieldValues } from "@oigamez/dynamodb";

import { CONNECTION_DYNAMO_TABLE_NAME } from "/opt/nodejs/oigamez-core";
import { Room } from "/opt/nodejs/oigamez-core";

export const createOrUpdateRoomConnection = (
  room: Room,
  username: string,
  connectionId: string,
  ttl: number
): TransactWriteItem => {
  return {
    Put: {
      TableName: CONNECTION_DYNAMO_TABLE_NAME,
      Item: {
        [dynamoFieldNames.common.pk]: dynamoFieldValues.connection.pk(
          room.code
        ),
        [dynamoFieldNames.common.sk]: dynamoFieldValues.connection.sk(username),
        [dynamoFieldNames.connection.roomCode]:
          dynamoFieldValues.connection.roomCode(room.code),
        [dynamoFieldNames.connection.username]:
          dynamoFieldValues.connection.username(username),
        [dynamoFieldNames.connection.connectionId]:
          dynamoFieldValues.connection.connectionId(connectionId),
        [dynamoFieldNames.common.ttl]: dynamoFieldValues.connection.ttl(ttl),
      },
    },
  };
};
