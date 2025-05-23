describe("verifyDynamoHostRoomIndexName tests", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("HOST_ROOM_INDEX_NAME variable not set, throws an error", async () => {
    // Arrange
    const { verifyDynamoHostRoomIndexName } = await import(
      "./verify-dynamo-host-room-index-name.js"
    );

    // / Action / Assert
    expect(verifyDynamoHostRoomIndexName).toThrow(
      "HOST_ROOM_INDEX_NAME environment variable is not set"
    );
  });

  test("HOST_ROOM_INDEX_NAME variable is set, does not throw an error", async () => {
    // Arrange
    jest.doMock("./host-room-index-name.js", () => {
      return {
        HOST_ROOM_INDEX_NAME: "HostRoomIndex",
      };
    });

    const { verifyDynamoHostRoomIndexName } = await import(
      "./verify-dynamo-host-room-index-name.js"
    );

    // Action / Assert
    expect(verifyDynamoHostRoomIndexName).not.toThrow(Error);
  });
});
