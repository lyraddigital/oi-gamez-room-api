import { TransactWriteItem } from "@aws-sdk/client-dynamodb";

import {
  dynamoFieldNames,
  dynamoFieldValues,
  expressions,
  keys,
} from "@oigamez/dynamodb";
import {
  DYNAMO_TABLE_NAME,
  Room,
  RoomVisiblityType,
} from "/opt/nodejs/oigamez-core";

export const updateRoomUserCount = (
  room: Room,
  userIncrement: number
): TransactWriteItem => {
  const isVisible =
    room.isPublic && room.curNumOfUsers + userIncrement < room.maxNumOfUsers;
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
        ":curNumOfUsers": dynamoFieldValues.room.curNumOfUsers(userIncrement),
        ":visibilityType":
          dynamoFieldValues.room.visibilityType(visibilityType),
      },
    },
  };
};
