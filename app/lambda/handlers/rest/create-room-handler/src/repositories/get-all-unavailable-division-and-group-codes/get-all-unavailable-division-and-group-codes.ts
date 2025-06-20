import { QueryCommandInput, QueryCommand } from "@aws-sdk/client-dynamodb";

import { DYNAMO_TABLE_NAME } from "@oigamez/core";
import { dbClient, dynamoFieldNames, dynamoFieldValues } from "@oigamez/data";

import { mapFromDynamoToUnavailableRoomCode } from "../../mappers";

export const getAllUnavailableDivisionAndGroupCodes = async (): Promise<
  string[]
> => {
  const queryCommandInput: QueryCommandInput = {
    TableName: DYNAMO_TABLE_NAME,
    KeyConditionExpression: "#pk = :pk",
    ExpressionAttributeNames: {
      "#pk": dynamoFieldNames.common.pk,
    },
    ExpressionAttributeValues: {
      ":pk": dynamoFieldValues.unavailableRoomCodes.pk,
    },
  };

  const command = new QueryCommand(queryCommandInput);
  const response = await dbClient.send(command);

  if (!response?.Items?.length) {
    return [];
  }

  return response.Items.map(mapFromDynamoToUnavailableRoomCode);
};
