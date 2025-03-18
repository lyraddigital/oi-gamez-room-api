import { removeRoom } from "./remove-room";

jest.mock("@oigamez/configuration", () => {
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
