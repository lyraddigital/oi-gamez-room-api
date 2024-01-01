import { AttributeValue } from "@aws-sdk/client-dynamodb";

interface CommonFieldNames {
  pk: string;
  sk: string;
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

interface AvailableDivisionCodeFieldValues {
  pk: (divisionCode: string) => AttributeValue.SMember;
  sk: (groupCode: string) => AttributeValue.SMember;
}

interface GameTypesFieldValues {
  pk: AttributeValue.SMember;
}

interface UnavailableRoomCodesFieldValues {
  pk: AttributeValue.SMember;
}

interface DynamoKey {
  PK: AttributeValue.SMember;
  SK: AttributeValue.SMember;
}

export interface DynamoFieldNames {
  common: CommonFieldNames;
  gameType: GameTypesFieldNames;
  availableDivisionCodes: AvailableDivisionCodeFieldNames;
}

export interface DynamoFieldValues {
  availableDivisionCodes: AvailableDivisionCodeFieldValues;
  gameTypes: GameTypesFieldValues;
  unavailableRoomCodes: UnavailableRoomCodesFieldValues;
}

export interface DynamoKeys {
  availableDivisionCodes: (
    divisionRoomCode: string,
    groupRoomCode: string
  ) => DynamoKey & Record<string, AttributeValue>;
}
