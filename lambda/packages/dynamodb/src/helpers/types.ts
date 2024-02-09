import { AttributeValue } from "@aws-sdk/client-dynamodb";

interface CommonFieldNames {
  pk: string;
  sk: string;
  type: string;
  ttl: string;
}

interface ConnectionFieldNames {
  pk: string;
  sk: string;
  ttl: string;
  username: string;
  roomCode: string;
  connectionId: string;
  lastDisconnected: string;
}

interface AvailableDivisionCodeFieldNames {
  subCodes: string;
}

interface GameTypesFieldNames {
  gameTypeId: string;
  name: string;
  description: string;
  iconUrl: string;
  minNumberOfUsers: string;
  maxNumberOfUsers: string;
}

interface RoomFieldNames {
  code: string;
  createdAt: string;
  hostUsername: string;
  curNumOfUsers: string;
  maxNumOfUsers: string;
  minNumOfUsers: string;
  status: string;
  title: string;
  isPublic: string;
  isVisible: string;
  gameTypeId: string;
}

interface CommonFieldValues {
  ttl: (ttl: number) => AttributeValue.NMember;
}

interface ConnectionFieldValues {
  pk: (roomCode: string) => AttributeValue.SMember;
  sk: (username: string) => AttributeValue.SMember;
  username: (username: string) => AttributeValue.SMember;
  roomCode: (roomCode: string) => AttributeValue.SMember;
  connectionId: (connectionId: string) => AttributeValue.SMember;
  lastDisconnected: (lastDisconnected: number) => AttributeValue.NMember;
  ttl: (ttl: number) => AttributeValue.NMember;
}

interface AvailableDivisionCodeFieldValues {
  pk: (divisionCode: string) => AttributeValue.SMember;
  sk: (groupCode: string) => AttributeValue.SMember;
  subCodes: (subCodes: string[]) => AttributeValue.SSMember;
  type: AttributeValue.SMember;
}

interface GameTypesFieldValues {
  pk: AttributeValue.SMember;
  sk: (gameTypeId: number) => AttributeValue.SMember;
  type: AttributeValue.SMember;
}

interface RoomFieldValues {
  pk: (code: string) => AttributeValue.SMember;
  sk: AttributeValue.SMember;
  code: (code: string) => AttributeValue.SMember;
  createdAt: (createdAt: string) => AttributeValue.SMember;
  curNumOfUsers: (curNumOfUsers: number) => AttributeValue.NMember;
  gameTypeId: (gameTypeId: number) => AttributeValue.NMember;
  hostUsername: (hostUsername: string) => AttributeValue.SMember;
  isPublic: (isPublic: boolean) => AttributeValue.BOOLMember;
  isVisible: (isVisible: boolean) => AttributeValue.BOOLMember;
  maxNumOfUsers: (maxNumOfUsers: number) => AttributeValue.NMember;
  minNumOfUsers: (minNumOfUsers: number) => AttributeValue.NMember;
  status: (status: string) => AttributeValue.SMember;
  title: (title: string) => AttributeValue.SMember;
  type: AttributeValue.SMember;
}

interface UnavailableRoomCodesFieldValues {
  pk: AttributeValue.SMember;
  sk: (roomDivisionAndGroupCode: string) => AttributeValue.SMember;
  type: AttributeValue.SMember;
}

interface DynamoKey {
  PK: AttributeValue.SMember;
  SK: AttributeValue.SMember;
}

interface CommonConditionalExpressions {
  keysExists: string;
  keysDoNotExists: string;
}

export enum RecordType {
  gameType = "GameType",
  room = "Room",
  unavailableRoomCode = "UnavailableRoomCode",
  availableDivisionCode = "AvailableDivisionCode",
}

export interface DynamoConditionalExpressions {
  common: CommonConditionalExpressions;
}

export interface DynamoFieldNames {
  common: CommonFieldNames;
  connection: ConnectionFieldNames;
  gameType: GameTypesFieldNames;
  availableDivisionCodes: AvailableDivisionCodeFieldNames;
  room: RoomFieldNames;
}

export interface DynamoFieldValues {
  common: CommonFieldValues;
  connection: ConnectionFieldValues;
  availableDivisionCodes: AvailableDivisionCodeFieldValues;
  gameTypes: GameTypesFieldValues;
  unavailableRoomCodes: UnavailableRoomCodesFieldValues;
  room: RoomFieldValues;
}

export interface DynamoKeys {
  connection: (
    roomCode: string,
    username: string
  ) => DynamoKey & Record<string, AttributeValue>;
  gameType: (gameTypeId: number) => DynamoKey & Record<string, AttributeValue>;
  room: (roomCode: string) => DynamoKey & Record<string, AttributeValue>;
  availableDivisionCodes: (
    divisionRoomCode: string,
    groupRoomCode: string
  ) => DynamoKey & Record<string, AttributeValue>;
  unavailableDivisionCodes: (
    roomDivisionAndGroupCode: string
  ) => DynamoKey & Record<string, AttributeValue>;
}
