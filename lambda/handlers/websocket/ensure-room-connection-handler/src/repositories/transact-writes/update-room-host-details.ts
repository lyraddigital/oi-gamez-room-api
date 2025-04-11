import { TransactWriteItem } from "@aws-sdk/client-dynamodb";

import { DYNAMO_TABLE_NAME, Room, RoomVisiblityType } from "@oigamez/core";
import {
  dynamoFieldNames,
  dynamoFieldValues,
  expressions,
  keys,
} from "@oigamez/data";

export const updateRoomHostDetails = (
  room: Room,
  ttl: number
): TransactWriteItem => {
  const visibilityType = room.isPublic
    ? RoomVisiblityType.visible
    : RoomVisiblityType.hidden;

  return {
    Update: {
      TableName: DYNAMO_TABLE_NAME,
      Key: keys.room(room.code),
      UpdateExpression:
        "SET #ttl = :ttl, #curNumOfUsers = :curNumOfUsers, #visibilityType = :visibilityType",
      ConditionExpression: expressions.common.keysExists,
      ExpressionAttributeNames: {
        "#ttl": dynamoFieldNames.common.ttl,
        "#curNumOfUsers": dynamoFieldNames.room.curNumOfUsers,
        "#visibilityType": dynamoFieldNames.room.visibilityType,
      },
      ExpressionAttributeValues: {
        ":ttl": dynamoFieldValues.common.ttl(ttl),
        ":curNumOfUsers": dynamoFieldValues.room.curNumOfUsers(1),
        ":visibilityType":
          dynamoFieldValues.room.visibilityType(visibilityType),
      },
    },
  };
};
