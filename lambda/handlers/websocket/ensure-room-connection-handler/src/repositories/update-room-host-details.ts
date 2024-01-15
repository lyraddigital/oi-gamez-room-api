import { TransactWriteItem } from "@aws-sdk/client-dynamodb";

import { DYNAMO_TABLE_NAME } from "@oigamez/configuration";
import {
  dynamoFieldNames,
  dynamoFieldValues,
  expressions,
  keys,
} from "@oigamez/dynamodb";
import { Room, RoomStatus } from "@oigamez/models";

export const updateRoomHostDetails = (
  room: Room,
  ttl: number
): TransactWriteItem => {
  return {
    Update: {
      TableName: DYNAMO_TABLE_NAME,
      Key: keys.room(room.code),
      UpdateExpression:
        "SET #ttl = :ttl, #status = :status, #curNumOfUsers = :curNumOfUsers",
      ConditionExpression: expressions.common.keysExists,
      ExpressionAttributeNames: {
        "#ttl": dynamoFieldNames.common.ttl,
        "#status": dynamoFieldNames.room.status,
        "#curNumOfUsers": dynamoFieldNames.room.curNumOfUsers,
      },
      ExpressionAttributeValues: {
        ":ttl": dynamoFieldValues.common.ttl(ttl),
        ":status": dynamoFieldValues.room.status(RoomStatus.Available),
        ":curNumOfUsers": dynamoFieldValues.room.curNumOfUsers(1),
      },
    },
  };
};
