import {
  getDynamoString,
  getDynamoInt,
  getOptionalDynamoInt,
  getDynamoBoolean,
  dynamoFieldNames,
  dynamoFieldValues,
  expressions,
  keys,
} from "./field-helpers";
import { RecordType } from "./types";

describe("field helper tests", () => {
  describe("dynamo field function tests", () => {
    test("String attribute passed to getDynamoString function with no default value, maps to a correct string", () => {
      // Arrange
      const someString = "someString";
      const aStringAttribute = {
        S: someString,
      };

      // Action
      const convertedString = getDynamoString(aStringAttribute);

      // Assert
      expect(convertedString).toBe(someString);
    });

    test("undefined passed to getDynamoString function with no default value, maps to an empty string", () => {
      // Arrange / Action
      const convertedString = getDynamoString(undefined);

      // Assert
      expect(convertedString).toBe("");
    });

    test("undefined passed to getDynamoString function with a default value, maps to the default value", () => {
      // Arrange
      const defaultValue = "someString";

      // Action
      const convertedString = getDynamoString(undefined, defaultValue);

      // Assert
      expect(convertedString).toBe(defaultValue);
    });

    test("Number attribute passed to getDynamoInt function with no default value, maps to a correct number", () => {
      // Arrange
      const someNumber = 15;
      const aNumberAttribute = {
        N: someNumber.toString(),
      };

      // Action
      const convertedNumber = getDynamoInt(aNumberAttribute);

      // Assert
      expect(convertedNumber).toBe(someNumber);
    });

    test("undefined passed to getDynamoInt function with no default value, maps to a 0", () => {
      // Arrange / Action
      const convertedNumber = getDynamoInt(undefined);

      // Assert
      expect(convertedNumber).toBe(0);
    });

    test("undefined passed to getDynamoInt function with a default value, maps to the default value", () => {
      // Arrange
      const defaultValue = 12;

      // Action
      const convertedNumber = getDynamoInt(undefined, defaultValue);

      // Assert
      expect(convertedNumber).toBe(defaultValue);
    });

    test("Number attribute passed to getOptionalDynamoInt function, maps to a correct number", () => {
      // Arrange
      const someNumber = 15;
      const aNumberAttribute = {
        N: someNumber.toString(),
      };

      // Action
      const convertedNumber = getOptionalDynamoInt(aNumberAttribute);

      // Assert
      expect(convertedNumber).toBe(someNumber);
    });

    test("undefined passed to getOptionalDynamoInt function, maps to undefined", () => {
      // Arrange / Action
      const convertedNumber = getOptionalDynamoInt(undefined);

      // Assert
      expect(convertedNumber).toBeUndefined();
    });

    test("Bool attribute passed to getDynamoBoolean function with no default value, maps to a correct boolean", () => {
      // Arrange
      const someBool = true;
      const aBoolAttribute = {
        BOOL: someBool,
      };

      // Action
      const convertedBool = getDynamoBoolean(aBoolAttribute);

      // Assert
      expect(convertedBool).toBe(someBool);
    });

    test("undefined passed to getDynamoBoolean function with no default value, maps to false", () => {
      // Arrange / Action
      const convertedBool = getDynamoBoolean(undefined);

      // Assert
      expect(convertedBool).toBe(false);
    });

    test("undefined passed to getDynamoBoolean function with a default value, maps to the default value", () => {
      // Arrange
      const defaultValue = true;

      // Action
      const convertedBool = getDynamoBoolean(undefined, defaultValue);

      // Assert
      expect(convertedBool).toBe(defaultValue);
    });
  });

  describe("dynamo field name tests", () => {
    test("checks common field names are correct", () => {
      // Arrange / Action / Assert
      expect(dynamoFieldNames.common.pk).toBe("PK");
      expect(dynamoFieldNames.common.sk).toBe("SK");
      expect(dynamoFieldNames.common.ttl).toBe("TTL");
      expect(dynamoFieldNames.common.type).toBe("Type");
    });

    test("checks connection field names are correct", () => {
      // Arrange / Action / Assert
      expect(dynamoFieldNames.connection.connectionId).toBe("ConnectionId");
      expect(dynamoFieldNames.connection.lastDisconnected).toBe(
        "LastDisconnected"
      );
      expect(dynamoFieldNames.connection.roomCode).toBe("RoomCode");
      expect(dynamoFieldNames.connection.username).toBe("Username");
    });

    test("checks gameType field names are correct", () => {
      // Arrange / Action / Assert
      expect(dynamoFieldNames.gameType.gameTypeId).toBe("GameTypeId");
      expect(dynamoFieldNames.gameType.name).toBe("Name");
      expect(dynamoFieldNames.gameType.description).toBe("Description");
      expect(dynamoFieldNames.gameType.iconUrl).toBe("IconUrl");
      expect(dynamoFieldNames.gameType.minNumberOfUsers).toBe(
        "MinNumberOfUsers"
      );
      expect(dynamoFieldNames.gameType.maxNumberOfUsers).toBe(
        "MaxNumberOfUsers"
      );
    });

    test("checks availableDivisionCodes field names are correct", () => {
      // Arrange / Action / Assert
      expect(dynamoFieldNames.availableDivisionCodes.subCodes).toBe("Subcodes");
    });

    test("checks room field names are correct", () => {
      // Arrange / Action / Assert
      expect(dynamoFieldNames.room.code).toBe("RoomCode");
      expect(dynamoFieldNames.room.createdAt).toBe("CreatedAt");
      expect(dynamoFieldNames.room.hostUsername).toBe("HostUsername");
      expect(dynamoFieldNames.room.curNumOfUsers).toBe("CurNumberOfUsers");
      expect(dynamoFieldNames.room.minNumOfUsers).toBe("MinNumberOfUsers");
      expect(dynamoFieldNames.room.maxNumOfUsers).toBe("MaxNumberOfUsers");
      expect(dynamoFieldNames.room.status).toBe("Status");
      expect(dynamoFieldNames.room.gameTypeId).toBe("GameTypeId");
      expect(dynamoFieldNames.room.title).toBe("Title");
      expect(dynamoFieldNames.room.isPublic).toBe("IsPublic");
      expect(dynamoFieldNames.room.visibilityType).toBe("VisibilityType");
    });
  });

  describe("dynamo field value tests", () => {
    test("checks common field values are correct", () => {
      // Arrange
      const ttl = 100;
      const expectedTTLAttribute = {
        N: ttl.toString(),
      };

      // Action / Assert
      expect(dynamoFieldValues.common.ttl(ttl)).toEqual(expectedTTLAttribute);
    });

    test("checks connection field values are correct", () => {
      // Arrange
      const roomCode = "ABCD";
      const username = "daryl_duck";
      const connectionId = "conn1234";
      const lastDisconnected = 109348449;
      const ttl = 19393848484;
      const expectedPkAttribute = {
        S: `Room#${roomCode}`,
      };
      const expectedSkAttribute = {
        S: `#User#${username}`,
      };
      const expectedUsernameAttribute = {
        S: username,
      };
      const expectedConnectionIdAttribute = {
        S: connectionId,
      };
      const expectedRoomCodeAttribute = {
        S: roomCode,
      };
      const expectedLastDisconnectedAttribute = {
        N: lastDisconnected.toString(),
      };
      const expectedTtlAttribute = {
        N: ttl.toString(),
      };

      // Action / Assert
      expect(dynamoFieldValues.connection.pk(roomCode)).toEqual(
        expectedPkAttribute
      );

      expect(dynamoFieldValues.connection.sk(username)).toEqual(
        expectedSkAttribute
      );

      expect(dynamoFieldValues.connection.username(username)).toEqual(
        expectedUsernameAttribute
      );

      expect(dynamoFieldValues.connection.connectionId(connectionId)).toEqual(
        expectedConnectionIdAttribute
      );

      expect(dynamoFieldValues.connection.roomCode(roomCode)).toEqual(
        expectedRoomCodeAttribute
      );

      expect(
        dynamoFieldValues.connection.lastDisconnected(lastDisconnected)
      ).toEqual(expectedLastDisconnectedAttribute);

      expect(dynamoFieldValues.connection.ttl(ttl)).toEqual(
        expectedTtlAttribute
      );
    });

    test("checks game type field values are correct", () => {
      // Arrange
      const gameTypeId = 1;
      const expectedPkAttribute = {
        S: "GameTypes",
      };
      const expectedSkAttribute = {
        S: `#${gameTypeId}`,
      };
      const expectedTypeAttribute = {
        S: RecordType.gameType,
      };

      // Action / Assert
      expect(dynamoFieldValues.gameTypes.pk).toEqual(expectedPkAttribute);

      expect(dynamoFieldValues.gameTypes.sk(gameTypeId)).toEqual(
        expectedSkAttribute
      );

      expect(dynamoFieldValues.gameTypes.type).toEqual(expectedTypeAttribute);
    });

    test("checks unavailable room code field values are correct", () => {
      // Arrange
      const roomDivisionAndGroupCode = "ABCD";
      const expectedPkAttribute = {
        S: "UnavailableDivisionAndGroupCodes",
      };
      const expectedSkAttribute = {
        S: `#${roomDivisionAndGroupCode}`,
      };
      const expectedTypeAttribute = {
        S: RecordType.unavailableRoomCode,
      };

      // Action / Assert
      expect(dynamoFieldValues.unavailableRoomCodes.pk).toEqual(
        expectedPkAttribute
      );

      expect(
        dynamoFieldValues.unavailableRoomCodes.sk(roomDivisionAndGroupCode)
      ).toEqual(expectedSkAttribute);

      expect(dynamoFieldValues.unavailableRoomCodes.type).toEqual(
        expectedTypeAttribute
      );
    });

    test("checks available division code field values are correct", () => {
      // Arrange
      const divisionCode = "A";
      const groupCode = "B";
      const subCodes = ["AA", "AB"];
      const expectedPkAttribute = {
        S: `AvailableDivisionCode#${divisionCode}`,
      };
      const expectedSkAttribute = {
        S: `#GroupCode#${groupCode}`,
      };
      const expectedSubCodesAttribute = {
        SS: subCodes,
      };
      const expectedTypeAttribute = {
        S: RecordType.availableDivisionCode,
      };

      // Action / Assert
      expect(dynamoFieldValues.availableDivisionCodes.pk(divisionCode)).toEqual(
        expectedPkAttribute
      );

      expect(dynamoFieldValues.availableDivisionCodes.sk(groupCode)).toEqual(
        expectedSkAttribute
      );

      expect(
        dynamoFieldValues.availableDivisionCodes.subCodes(subCodes)
      ).toEqual(expectedSubCodesAttribute);

      expect(dynamoFieldValues.availableDivisionCodes.type).toEqual(
        expectedTypeAttribute
      );
    });

    test("checks room field values are correct", () => {
      // Arrange
      const roomCode = "ABCD";
      const createdAt = "2025-03-03T10:00:00.000Z";
      const hostUsername = "daryl_duck";
      const curNumOfUsers = 3;
      const minNumOfUsers = 2;
      const maxNumOfUsers = 4;
      const status = "available";
      const gameTypeId = 1;
      const title = "Room title";
      const isPublic = true;
      const visibilityType = "visible";
      const expectedPkAttribute = {
        S: `Room#${roomCode}`,
      };
      const expectedSkAttribute = {
        S: "#Metadata",
      };
      const expectedRoomCodeAttribute = {
        S: roomCode,
      };
      const expectedCreatedAtAttribute = {
        S: createdAt,
      };
      const expectedHostUsernameAttribute = {
        S: hostUsername,
      };
      const expectedCurNumberOfUsersAttribute = {
        N: curNumOfUsers.toString(),
      };
      const expectedMinNumberOfUsersAttribute = {
        N: minNumOfUsers.toString(),
      };
      const expectedMaxNumberOfUsersAttribute = {
        N: maxNumOfUsers.toString(),
      };
      const expectedStatusAttribute = {
        S: status,
      };
      const expectedGameTypeIdAttribute = {
        N: gameTypeId.toString(),
      };
      const expectedTitleAttribute = {
        S: title,
      };
      const expectedIsPublicAttribute = {
        BOOL: isPublic,
      };
      const expectedVisibilityTypeAttribute = {
        S: visibilityType,
      };
      const expectedTypeAttribute = {
        S: RecordType.room,
      };

      // Action / Assert
      expect(dynamoFieldValues.room.pk(roomCode)).toEqual(expectedPkAttribute);
      expect(dynamoFieldValues.room.sk).toEqual(expectedSkAttribute);
      expect(dynamoFieldValues.room.code(roomCode)).toEqual(
        expectedRoomCodeAttribute
      );
      expect(dynamoFieldValues.room.createdAt(createdAt)).toEqual(
        expectedCreatedAtAttribute
      );
      expect(dynamoFieldValues.room.hostUsername(hostUsername)).toEqual(
        expectedHostUsernameAttribute
      );
      expect(dynamoFieldValues.room.curNumOfUsers(curNumOfUsers)).toEqual(
        expectedCurNumberOfUsersAttribute
      );
      expect(dynamoFieldValues.room.minNumOfUsers(minNumOfUsers)).toEqual(
        expectedMinNumberOfUsersAttribute
      );
      expect(dynamoFieldValues.room.maxNumOfUsers(maxNumOfUsers)).toEqual(
        expectedMaxNumberOfUsersAttribute
      );
      expect(dynamoFieldValues.room.status(status)).toEqual(
        expectedStatusAttribute
      );
      expect(dynamoFieldValues.room.gameTypeId(gameTypeId)).toEqual(
        expectedGameTypeIdAttribute
      );
      expect(dynamoFieldValues.room.title(title)).toEqual(
        expectedTitleAttribute
      );
      expect(dynamoFieldValues.room.isPublic(isPublic)).toEqual(
        expectedIsPublicAttribute
      );
      expect(dynamoFieldValues.room.visibilityType(visibilityType)).toEqual(
        expectedVisibilityTypeAttribute
      );
      expect(dynamoFieldValues.room.type).toEqual(expectedTypeAttribute);
    });
  });

  describe("expression tests", () => {
    test("all common expressions are set correctly", () => {
      // Arrange / Action / Assert
      expect(expressions.common.keysExists).toBe(
        "attribute_exists(PK) AND attribute_exists(SK)"
      );
      expect(expressions.common.keysDoNotExists).toBe(
        "attribute_not_exists(PK) AND attribute_not_exists(SK)"
      );
    });
  });

  describe("key tests", () => {
    test("Correct key values are set for a connection", () => {
      // Arrange
      const roomCode = "ABCD";
      const username = "daryl_duck";
      const expectedKey = {
        PK: { S: `Room#${roomCode}` },
        SK: { S: `#User#${username}` },
      };

      // Action
      const connectionKey = keys.connection(roomCode, username);

      // Assert
      expect(connectionKey).toBeDefined();
      expect(connectionKey).toEqual(expectedKey);
    });

    test("Correct key values are set for a game type", () => {
      // Arrange
      const gameTypeId = 1;
      const expectedKey = {
        PK: { S: `GameTypes` },
        SK: { S: `#${gameTypeId}` },
      };

      // Action
      const gameTypeKey = keys.gameType(gameTypeId);

      // Assert
      expect(gameTypeKey).toBeDefined();
      expect(gameTypeKey).toEqual(expectedKey);
    });

    test("Correct key values are set for a room", () => {
      // Arrange
      const roomCode = "ABCD";
      const expectedKey = {
        PK: { S: `Room#${roomCode}` },
        SK: { S: "#Metadata" },
      };

      // Action
      const roomKey = keys.room(roomCode);

      // Assert
      expect(roomKey).toBeDefined();
      expect(roomKey).toEqual(expectedKey);
    });

    test("Correct key values are set for an available division code", () => {
      // Arrange
      const divisionRoomCode = "A";
      const groupRoomCode = "B";
      const expectedKey = {
        PK: { S: `AvailableDivisionCode#${divisionRoomCode}` },
        SK: { S: `#GroupCode#${groupRoomCode}` },
      };

      // Action
      const availableDivisionCodeKey = keys.availableDivisionCodes(
        divisionRoomCode,
        groupRoomCode
      );

      // Assert
      expect(availableDivisionCodeKey).toBeDefined();
      expect(availableDivisionCodeKey).toEqual(expectedKey);
    });

    test("Correct key values are set for an unavailable division code", () => {
      // Arrange
      const roomDivisionAndGroupCode = "AB";
      const expectedKey = {
        PK: { S: "UnavailableDivisionAndGroupCodes" },
        SK: { S: `#${roomDivisionAndGroupCode}` },
      };

      // Action
      const unavailableDivisionCodeKey = keys.unavailableDivisionCodes(
        roomDivisionAndGroupCode
      );

      // Assert
      expect(unavailableDivisionCodeKey).toBeDefined();
      expect(unavailableDivisionCodeKey).toEqual(expectedKey);
    });
  });
});
