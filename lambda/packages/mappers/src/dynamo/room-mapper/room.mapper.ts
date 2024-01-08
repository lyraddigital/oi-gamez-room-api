import { AttributeValue } from "@aws-sdk/client-dynamodb";
import {
  dynamoFieldNames,
  getDynamoBoolean,
  getDynamoString,
} from "@oigamez/dynamodb";
import { Room } from "@oigamez/models";

export const mapFromDynamoToRoom = (
  dynamoRecord: Record<string, AttributeValue>
): Room => {
  return {
    title: getDynamoString(dynamoRecord[dynamoFieldNames.room.title]),
    hostUsername: getDynamoString(
      dynamoRecord[dynamoFieldNames.room.hostUsername]
    ),
    isPublic: getDynamoBoolean(dynamoRecord[dynamoFieldNames.room.visibility]),
    code: getDynamoString(dynamoRecord[dynamoFieldNames.room.code]),
    status: getDynamoString(dynamoRecord[dynamoFieldNames.room.status]),
  };
};
