import { TransactWriteItem } from "@aws-sdk/client-dynamodb";

import { DYNAMO_TABLE_NAME } from "@oigamez/configuration";
import {
  dynamoFieldNames,
  dynamoFieldValues,
  expressions,
  keys,
} from "@oigamez/dynamodb";
import { Room, RoomVisiblityType } from "@oigamez/models";

export const updateRoomUserCount = (room: Room): TransactWriteItem => {
  const isVisible =
    room.isPublic && room.curNumOfUsers + 1 < room.maxNumOfUsers;
  const visibilityType = isVisible
    ? RoomVisiblityType.visible
    : RoomVisiblityType.hidden;

  return {
    Update: {
      TableName: DYNAMO_TABLE_NAME,
      Key: keys.room(room.code),
      UpdateExpression:
        "ADD #curNumOfUsers :curNumOfUsers SET #visibilityType = :visibilityType",
      ConditionExpression: expressions.common.keysExists,
      ExpressionAttributeNames: {
        "#curNumOfUsers": dynamoFieldNames.room.curNumOfUsers,
        "#visibilityType": dynamoFieldNames.room.visibilityType,
      },
      ExpressionAttributeValues: {
        ":curNumOfUsers": dynamoFieldValues.room.curNumOfUsers(1),
        ":visibilityType":
          dynamoFieldValues.room.visibilityType(visibilityType),
      },
    },
  };
};
