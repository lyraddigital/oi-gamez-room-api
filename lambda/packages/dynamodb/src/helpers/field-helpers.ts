import { AttributeValue } from "@aws-sdk/client-dynamodb";

import { DynamoFieldNames, DynamoFieldValues } from "./types";

const stringAttribute = (stringValue: string): AttributeValue.SMember => ({
  S: stringValue,
});

export const getDynamoString = (
  dynamoField?: AttributeValue,
  defaultValue: string = ""
): string => {
  return dynamoField?.S || defaultValue;
};

export const getDynamoInt = (
  dynamoField?: AttributeValue,
  defaultValue: number = 0
): number => {
  return dynamoField?.N ? parseInt(dynamoField.N) : defaultValue;
};

export const dynamoFieldNames: DynamoFieldNames = {
  common: {
    pk: "PK",
    sk: "SK",
  },
  gameType: {
    gameTypeId: "GameTypeId",
    name: "Name",
    description: "Description",
    iconUrl: "IconUrl",
  },
};

export const dynamoFieldValues: DynamoFieldValues = {
  gameTypes: {
    pk: stringAttribute("GameTypes"),
  },
  unavailableRoomCodes: {
    pk: stringAttribute("UnavailableDivisionAndGroupCodes"),
  },
};
