import { AttributeValue } from "@aws-sdk/client-dynamodb";

import { dynamoFieldNames, getDynamoString } from "/opt/nodejs/oigamez-data.js";

export const mapFromDynamoToUnavailableRoomCode = (
  dynamoRecord: Record<string, AttributeValue>
): string => {
  return getDynamoString(dynamoRecord[dynamoFieldNames.common.sk]).replace(
    "#",
    ""
  );
};
