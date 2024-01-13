import { TransactWriteItem } from "@aws-sdk/client-dynamodb";

import { CONNECTION_DYNAMO_TABLE_NAME } from "@oigamez/configuration";
import { dynamoFieldNames, dynamoFieldValues } from "@oigamez/dynamodb";
import { Room } from "@oigamez/models";

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
        [dynamoFieldNames.connection.pk]: dynamoFieldValues.connection.pk(
          room.code
        ),
        [dynamoFieldNames.connection.sk]:
          dynamoFieldValues.connection.sk(username),
        [dynamoFieldNames.connection.username]:
          dynamoFieldValues.connection.username(username),
        [dynamoFieldNames.connection.connectionId]:
          dynamoFieldValues.connection.connectionId(connectionId),
        [dynamoFieldNames.connection.ttl]:
          dynamoFieldValues.connection.ttl(ttl),
      },
    },
  };
};
