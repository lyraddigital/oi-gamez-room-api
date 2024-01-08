import { AttributeValue } from "@aws-sdk/client-dynamodb";

import {
  DynamoConditionalExpressions,
  DynamoFieldNames,
  DynamoFieldValues,
  DynamoKeys,
  RecordType,
} from "./types";

const numberAttribute = (numberValue: number): AttributeValue.NMember => ({
  N: numberValue.toString(),
});

const stringSetAttribute = (
  stringValues: string[]
): AttributeValue.SSMember => ({
  SS: stringValues,
});

const booleanAttribute = (boolValue: boolean): AttributeValue.BOOLMember => ({
  BOOL: boolValue,
});

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

export const getDynamoBoolean = (
  dynamoField?: AttributeValue,
  defaultValue: boolean = false
): boolean => {
  return dynamoField?.BOOL || defaultValue;
};

export const dynamoFieldNames: DynamoFieldNames = {
  common: {
    pk: "PK",
    sk: "SK",
    ttl: "TTL",
    type: "Type",
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
  room: {
    code: "RoomCode",
    hostUsername: "HostUsername",
    status: "Status",
    title: "Title",
    visibility: "IsVisible",
  },
  user: {
    username: "Username",
  },
};

export const dynamoFieldValues: DynamoFieldValues = {
  common: {
    ttl: (ttl: number) => numberAttribute(ttl),
  },
  gameTypes: {
    pk: stringAttribute("GameTypes"),
    type: stringAttribute(RecordType.gameType),
  },
  unavailableRoomCodes: {
    pk: stringAttribute("UnavailableDivisionAndGroupCodes"),
    sk: (roomDivisionAndGroupCode: string) =>
      stringAttribute(roomDivisionAndGroupCode),
    type: stringAttribute(RecordType.unavailableRoomCode),
  },
  availableDivisionCodes: {
    pk: (divisionCode: string) =>
      stringAttribute(`AvailableDivisionCode#${divisionCode}`),
    sk: (groupCode: string) => stringAttribute(`#GroupCode#${groupCode}`),
    subCodes: (subCodes: string[]) => stringSetAttribute(subCodes),
    type: stringAttribute(RecordType.availableDivisionCode),
  },
  room: {
    pk: (code: string) => stringAttribute(`Room#${code}`),
    sk: stringAttribute("#Metadata"),
    code: (code: string) => stringAttribute(code),
    hostUsername: (hostUsername: string) => stringAttribute(hostUsername),
    status: (status: string) => stringAttribute(status),
    title: (title: string) => stringAttribute(title),
    visibility: (isVisible: boolean) => booleanAttribute(isVisible),
    type: stringAttribute(RecordType.room),
  },
  user: {
    pk: (roomCode: string) => stringAttribute(`Room#${roomCode}`),
    sk: (username: string) => stringAttribute(`#User#${username}`),
    username: (username: string) => stringAttribute(username),
    type: stringAttribute(RecordType.user),
  },
};

export const expressions: DynamoConditionalExpressions = {
  common: {
    keysExists: `attribute_exists(${dynamoFieldNames.common.pk}) AND attribute_exists(${dynamoFieldNames.common.sk})`,
    keysDoNotExists: `attribute_not_exists(${dynamoFieldNames.common.pk}) AND attribute_not_exists(${dynamoFieldNames.common.sk})`,
  },
};

export const keys: DynamoKeys = {
  availableDivisionCodes: (divisionRoomCode, groupRoomCode) => ({
    PK: dynamoFieldValues.availableDivisionCodes.pk(divisionRoomCode),
    SK: dynamoFieldValues.availableDivisionCodes.sk(groupRoomCode),
  }),
};
