import {
  DynamoDBClient,
  GetItemCommand,
  GetItemCommandOutput,
} from "@aws-sdk/client-dynamodb";
import { dbClient } from "@oigamez/dynamodb";

import { getUniqueRoomCode } from "./get-unique-room-code";

jest.mock("@oigamez/configuration", () => {
  return {
    DYNAMO_TABLE_NAME: "SomeTable",
  };
});

describe("getUniqueRoomCode tests", () => {
  const sendSpy = jest.spyOn<DynamoDBClient, "send">(dbClient, "send");
  const mathRandomSpy = jest.spyOn<Math, "random">(Math, "random");

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("makes the correct get command to dynamo db and returns mapped response", async () => {
    // Arrange
    const divisionCode = "A";
    const groupCode = "A";
    const availableCodes = ["AA", "AB"];
    const getItemResponse: GetItemCommandOutput = {
      Item: {
        PK: { S: `AvailableDivisionCode#${divisionCode}` },
        SK: { S: `#GroupCode#${groupCode}` },
        Subcodes: { SS: availableCodes },
      },
      $metadata: {},
    };

    mathRandomSpy.mockReturnValueOnce(0.8);
    sendSpy.mockReturnValueOnce(getItemResponse as any);

    // Action
    const [roomCode, isRoomCodeGroupExhaused] = await getUniqueRoomCode(
      divisionCode,
      groupCode
    );

    // Assert
    expect(roomCode).toBe("AAAB");
    expect(isRoomCodeGroupExhaused).toBe(false);
    expect(sendSpy.mock.calls.length).toBe(1);
    expect((sendSpy.mock.calls[0][0] as GetItemCommand).input.TableName).toBe(
      "SomeTable"
    );
    expect((sendSpy.mock.calls[0][0] as GetItemCommand).input.Key).toEqual({
      PK: { S: "AvailableDivisionCode#A" },
      SK: { S: "#GroupCode#A" },
    });
  });

  it("only one code left for division and group code, isRoomCodeExhaused is true", async () => {
    // Arrange
    const divisionCode = "A";
    const groupCode = "A";
    const availableCodes = ["AA"];
    const getItemResponse: GetItemCommandOutput = {
      Item: {
        PK: { S: `AvailableDivisionCode#${divisionCode}` },
        SK: { S: `#GroupCode#${groupCode}` },
        Subcodes: { SS: availableCodes },
      },
      $metadata: {},
    };

    mathRandomSpy.mockReturnValueOnce(0.8);
    sendSpy.mockReturnValueOnce(getItemResponse as any);

    // Action
    const [roomCode, isRoomCodeGroupExhaused] = await getUniqueRoomCode(
      divisionCode,
      groupCode
    );

    // Assert
    expect(roomCode).toBe("AAAA");
    expect(isRoomCodeGroupExhaused).toBe(true);
  });

  it("no codes left for division and group code, throws an error", async () => {
    // Arrange
    const divisionCode = "A";
    const groupCode = "A";
    const availableCodes: string[] = [];
    const getItemResponse: GetItemCommandOutput = {
      Item: {
        PK: { S: `AvailableDivisionCode#${divisionCode}` },
        SK: { S: `#GroupCode#${groupCode}` },
        Subcodes: { SS: availableCodes },
      },
      $metadata: {},
    };

    mathRandomSpy.mockReturnValueOnce(0.8);
    sendSpy.mockReturnValueOnce(getItemResponse as any);

    // Action / Assert
    try {
      await getUniqueRoomCode(divisionCode, groupCode);
    } catch (e: any) {
      expect(e.message).toBe(
        `We have no room codes left to allocate to a room of division code ${divisionCode} and group code ${groupCode}.`
      );
    }
  });

  it("subcodes is not set, throws an error", async () => {
    // Arrange
    const divisionCode = "A";
    const groupCode = "A";
    const getItemResponse: GetItemCommandOutput = {
      Item: {
        PK: { S: `AvailableDivisionCode#${divisionCode}` },
        SK: { S: `#GroupCode#${groupCode}` },
      },
      $metadata: {},
    };

    mathRandomSpy.mockReturnValueOnce(0.8);
    sendSpy.mockReturnValueOnce(getItemResponse as any);

    // Action / Assert
    try {
      await getUniqueRoomCode(divisionCode, groupCode);
    } catch (e: any) {
      expect(e.message).toBe(
        `We have no room codes left to allocate to a room of division code ${divisionCode} and group code ${groupCode}.`
      );
    }
  });

  it("Get item command returns no item, throws an error", async () => {
    // Arrange
    const divisionCode = "A";
    const groupCode = "A";
    const getItemResponse: GetItemCommandOutput = {
      $metadata: {},
    };

    mathRandomSpy.mockReturnValueOnce(0.8);
    sendSpy.mockReturnValueOnce(getItemResponse as any);

    // Action / Assert
    try {
      await getUniqueRoomCode(divisionCode, groupCode);
    } catch (e: any) {
      expect(e.message).toBe(
        `We have no room codes left to allocate to a room of division code ${divisionCode} and group code ${groupCode}.`
      );
    }
  });
});
