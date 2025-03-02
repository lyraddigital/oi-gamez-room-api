describe("verifyDynamoVisibleRoomIndexName tests", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it("VISIBLE_ROOM_INDEX_NAME variable not set, throws an error", async () => {
    // Arrange
    const { verifyDynamoVisibleRoomIndexName } = await import(
      "./verify-dynamo-visible-room-index-name"
    );

    // / Action / Assert
    expect(verifyDynamoVisibleRoomIndexName).toThrow(
      "VISIBLE_ROOM_INDEX_NAME environment variable is not set"
    );
  });

  it("VISIBLE_ROOM_INDEX_NAME variable is set, does not throw an error", async () => {
    // Arrange
    jest.doMock("./visible-room-index-name", () => {
      return {
        VISIBLE_ROOM_INDEX_NAME: "VisibleRoomIndex",
      };
    });

    const { verifyDynamoVisibleRoomIndexName } = await import(
      "./verify-dynamo-visible-room-index-name"
    );

    // Action / Assert
    expect(verifyDynamoVisibleRoomIndexName).not.toThrow(Error);
  });
});
