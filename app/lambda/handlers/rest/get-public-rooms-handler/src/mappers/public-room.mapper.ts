import { AttributeValue } from "@aws-sdk/client-dynamodb";

import { dynamoFieldNames, getDynamoInt, getDynamoString } from "@oigamez/data";

import { PublicRoom } from "../models";

export const mapFromDynamoToPublicRoom = (
  dynamoRecord: Record<string, AttributeValue>
): PublicRoom => {
  return {
    code: getDynamoString(dynamoRecord[dynamoFieldNames.room.code]),
    title: getDynamoString(dynamoRecord[dynamoFieldNames.room.title]),
    hostUsername: getDynamoString(
      dynamoRecord[dynamoFieldNames.room.hostUsername]
    ),
    numberOfUsers: getDynamoInt(
      dynamoRecord[dynamoFieldNames.room.curNumOfUsers]
    ),
    maxNumberOfUsers: getDynamoInt(
      dynamoRecord[dynamoFieldNames.room.maxNumOfUsers]
    ),
  };
};
