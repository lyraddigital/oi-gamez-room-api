import { dbClient } from "@oigamez/dynamodb";

import { releaseRoomCode } from "./release-room-code";
import { TransactWriteItemsCommand } from "@aws-sdk/client-dynamodb";

jest.mock("@oigamez/configuration", () => {
  return {
    DYNAMO_TABLE_NAME: "SomeTable",
  };
});

describe("releaseRoomCode tests", () => {
  const sendSpy = jest.spyOn(dbClient, "send");

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("executes the correct transaction based on the room code", async () => {
    // Arrange
    const roomCode = "ABCD";
    const expectedDivisionCode = "A";
    const expectedGroupCode = "B";
    const expectedSubCode = "CD";

    sendSpy.mockReturnValueOnce();

    // Action
    await releaseRoomCode(roomCode);

    // Assert
    expect(sendSpy).toHaveBeenCalled();
    expect(
      (sendSpy.mock.calls[0][0] as TransactWriteItemsCommand).input
        .TransactItems
    ).toHaveLength(2);
    expect(
      (sendSpy.mock.calls[0][0] as TransactWriteItemsCommand).input
        .TransactItems![0]
    ).toEqual({
      Update: {
        TableName: "SomeTable",
        Key: {
          PK: { S: `AvailableDivisionCode#${expectedDivisionCode}` },
          SK: { S: `#GroupCode#${expectedGroupCode}` },
        },
        UpdateExpression: "ADD #subCodes :subCodes",
        ExpressionAttributeNames: {
          "#subCodes": "Subcodes",
        },
        ExpressionAttributeValues: {
          ":subCodes": { SS: [expectedSubCode] },
        },
      },
    });
    expect(
      (sendSpy.mock.calls[0][0] as TransactWriteItemsCommand).input
        .TransactItems![1]
    ).toEqual({
      Delete: {
        TableName: "SomeTable",
        Key: {
          PK: { S: "UnavailableDivisionAndGroupCodes" },
          SK: { S: `#${expectedDivisionCode}${expectedGroupCode}` },
        },
      },
    });
  });
});
