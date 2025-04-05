import { AttributeValue } from "@aws-sdk/client-dynamodb";

import { GameType } from "/opt/nodejs/oigamez-core";
import {
  dynamoFieldNames,
  getDynamoInt,
  getDynamoString,
} from "../../../dynamodb";

export const mapFromDynamoToGameType = (
  dynamoRecord: Record<string, AttributeValue>
): GameType => {
  return {
    id: getDynamoInt(dynamoRecord[dynamoFieldNames.gameType.gameTypeId], 0),
    name: getDynamoString(dynamoRecord[dynamoFieldNames.gameType.name]),
    description: getDynamoString(
      dynamoRecord[dynamoFieldNames.gameType.description]
    ),
    iconUrl: getDynamoString(dynamoRecord[dynamoFieldNames.gameType.iconUrl]),
    minNumOfUsers: getDynamoInt(
      dynamoRecord[dynamoFieldNames.gameType.minNumberOfUsers]
    ),
    maxNumOfUsers: getDynamoInt(
      dynamoRecord[dynamoFieldNames.gameType.maxNumberOfUsers]
    ),
  };
};
