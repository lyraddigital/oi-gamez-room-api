describe("verifyRoomSocketApiEndpoint tests", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it("ROOM_SOCKET_API_ENDPOINT variable not set, throws an error", async () => {
    // Arrange
    const { verifyRoomSocketApiEndpoint } = await import(
      "./verify-room-socket-api-endpoint"
    );

    // / Action / Assert
    expect(verifyRoomSocketApiEndpoint).toThrow(
      "ROOM_SOCKET_API_ENDPOINT environment variable is not set"
    );
  });

  it("ROOM_SOCKET_API_ENDPOINT variable is set, does not throw an error", async () => {
    // Arrange
    jest.doMock("./room-socket-api-endpoint", () => {
      return {
        ROOM_SOCKET_API_ENDPOINT: "ws://localhost",
      };
    });

    const { verifyRoomSocketApiEndpoint } = await import(
      "./verify-room-socket-api-endpoint"
    );

    // Action / Assert
    expect(verifyRoomSocketApiEndpoint).not.toThrow(Error);
  });
});
