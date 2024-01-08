import { AttributeValue } from "@aws-sdk/client-dynamodb";

import { dynamoFieldNames, getDynamoString } from "@oigamez/dynamodb";
import { User } from "@oigamez/models";

export const mapFromDynamoToUser = (
  dynamoRecord: Record<string, AttributeValue>
): User => {
  return {
    username: getDynamoString(dynamoRecord[dynamoFieldNames.user.username]),
  };
};
