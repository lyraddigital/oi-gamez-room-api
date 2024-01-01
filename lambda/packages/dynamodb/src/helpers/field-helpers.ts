import { AttributeValue } from "@aws-sdk/client-dynamodb";

import { DynamoFieldNames, DynamoFieldValues, DynamoKeys } from "./types";

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
  availableDivisionCodes: {
    subCodes: "Subcodes",
  },
};

export const dynamoFieldValues: DynamoFieldValues = {
  gameTypes: {
    pk: stringAttribute("GameTypes"),
  },
  unavailableRoomCodes: {
    pk: stringAttribute("UnavailableDivisionAndGroupCodes"),
  },
  availableDivisionCodes: {
    pk: (divisionCode: string) =>
      stringAttribute(`AvailableDivisionCode#${divisionCode}`),
    sk: (groupCode: string) => stringAttribute(`#GroupCode#${groupCode}`),
  },
};

export const keys: DynamoKeys = {
  availableDivisionCodes: (divisionRoomCode, groupRoomCode) => ({
    PK: dynamoFieldValues.availableDivisionCodes.pk(divisionRoomCode),
    SK: dynamoFieldValues.availableDivisionCodes.sk(groupRoomCode),
  }),
};
