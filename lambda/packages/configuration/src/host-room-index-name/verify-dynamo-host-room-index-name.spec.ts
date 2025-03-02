describe("verifyDynamoHostRoomIndexName tests", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it("HOST_ROOM_INDEX_NAME variable not set, throws an error", async () => {
    // Arrange
    const { verifyDynamoHostRoomIndexName } = await import(
      "./verify-dynamo-host-room-index-name"
    );

    // / Action / Assert
    expect(verifyDynamoHostRoomIndexName).toThrow(
      "HOST_ROOM_INDEX_NAME environment variable is not set"
    );
  });

  it("HOST_ROOM_INDEX_NAME variable is set, does not throw an error", async () => {
    // Arrange
    jest.doMock("./host-room-index-name", () => {
      return {
        HOST_ROOM_INDEX_NAME: "HostRoomIndex",
      };
    });

    const { verifyDynamoHostRoomIndexName } = await import(
      "./verify-dynamo-host-room-index-name"
    );

    // Action / Assert
    expect(verifyDynamoHostRoomIndexName).not.toThrow(Error);
  });
});
