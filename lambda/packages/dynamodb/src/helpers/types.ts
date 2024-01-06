import { AttributeValue } from "@aws-sdk/client-dynamodb";

interface CommonFieldNames {
  pk: string;
  sk: string;
  ttl: string;
}

interface AvailableDivisionCodeFieldNames {
  subCodes: string;
}

interface GameTypesFieldNames {
  gameTypeId: string;
  name: string;
  description: string;
  iconUrl: string;
}

interface RoomFieldNames {
  code: string;
  hostUsername: string;
  title: string;
  visibility: string;
}

interface UserFieldNames {
  username: string;
}

interface CommonFieldValues {
  ttl: (ttl: number) => AttributeValue.NMember;
}

interface AvailableDivisionCodeFieldValues {
  pk: (divisionCode: string) => AttributeValue.SMember;
  sk: (groupCode: string) => AttributeValue.SMember;
  subCodes: (subCodes: string[]) => AttributeValue.SSMember;
}

interface GameTypesFieldValues {
  pk: AttributeValue.SMember;
}

interface RoomFieldValues {
  pk: (code: string) => AttributeValue.SMember;
  sk: AttributeValue.SMember;
  code: (code: string) => AttributeValue.SMember;
  hostUsername: (hostUsername: string) => AttributeValue.SMember;
  title: (title: string) => AttributeValue.SMember;
  visibility: (isVisible: boolean) => AttributeValue.BOOLMember;
}

interface UnavailableRoomCodesFieldValues {
  pk: AttributeValue.SMember;
  sk: (roomDivisionAndGroupCode: string) => AttributeValue.SMember;
}

interface UserFieldValues {
  pk: (roomCode: string) => AttributeValue.SMember;
  sk: (username: string) => AttributeValue.SMember;
  username: (username: string) => AttributeValue.SMember;
}

interface DynamoKey {
  PK: AttributeValue.SMember;
  SK: AttributeValue.SMember;
}

interface CommonConditionalExpressions {
  keysExists: string;
  keysDoNotExists: string;
}

export interface DynamoConditionalExpressions {
  common: CommonConditionalExpressions;
}

export interface DynamoFieldNames {
  common: CommonFieldNames;
  gameType: GameTypesFieldNames;
  availableDivisionCodes: AvailableDivisionCodeFieldNames;
  room: RoomFieldNames;
  user: UserFieldNames;
}

export interface DynamoFieldValues {
  common: CommonFieldValues;
  availableDivisionCodes: AvailableDivisionCodeFieldValues;
  gameTypes: GameTypesFieldValues;
  unavailableRoomCodes: UnavailableRoomCodesFieldValues;
  room: RoomFieldValues;
  user: UserFieldValues;
}

export interface DynamoKeys {
  availableDivisionCodes: (
    divisionRoomCode: string,
    groupRoomCode: string
  ) => DynamoKey & Record<string, AttributeValue>;
}
