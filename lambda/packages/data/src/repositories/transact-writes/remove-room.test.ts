import { removeRoom } from "./remove-room.js";

jest.mock("/opt/nodejs/oigamez-core.js", () => {
  return {
    DYNAMO_TABLE_NAME: "SomeTable",
  };
});

describe("removeRoom tests", () => {
  test("makes the correct transact write item is created", () => {
    // Arrange
    const roomCode = "ABCD";

    // Action
    const transactWriteItem = removeRoom(roomCode);

    // Assert
    expect(transactWriteItem).toBeDefined();
    expect(transactWriteItem.Delete!.TableName).toBe("SomeTable");
    expect(transactWriteItem.Delete!.Key).toEqual({
      PK: { S: `Room#${roomCode}` },
      SK: { S: "#Metadata" },
    });
  });
});
