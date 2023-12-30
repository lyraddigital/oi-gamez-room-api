import { AttributeValue } from "@aws-sdk/client-dynamodb";

interface CommonFieldNames {
  pk: string;
  sk: string;
}

interface GameTypesFieldNames {
  gameTypeId: string;
  name: string;
  description: string;
  iconUrl: string;
}

interface GameTypesFieldValues {
  pk: AttributeValue.SMember;
}

interface UnavailableRoomCodesFieldValues {
  pk: AttributeValue.SMember;
}

export interface DynamoFieldNames {
  common: CommonFieldNames;
  gameType: GameTypesFieldNames;
}

export interface DynamoFieldValues {
  gameTypes: GameTypesFieldValues;
  unavailableRoomCodes: UnavailableRoomCodesFieldValues;
}
