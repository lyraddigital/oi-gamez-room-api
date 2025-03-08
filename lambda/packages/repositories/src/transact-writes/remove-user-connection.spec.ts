import { removeUserConnection } from "./remove-user-connection";

jest.mock("@oigamez/configuration", () => {
  return {
    CONNECTION_DYNAMO_TABLE_NAME: "SomeConnectionTable",
  };
});

describe("removeUserConnection tests", () => {
  it("makes the correct transact write item is created", () => {
    // Arrange
    const roomCode = "ABCD";
    const username = "daryl_duck";

    // Action
    const transactWriteItem = removeUserConnection(roomCode, username);

    // Assert
    expect(transactWriteItem).toBeDefined();
    expect(transactWriteItem.Delete!.TableName).toBe("SomeConnectionTable");
    expect(transactWriteItem.Delete!.Key).toEqual({
      PK: { S: `Room#${roomCode}` },
      SK: { S: `#User#${username}` },
    });
  });
});
