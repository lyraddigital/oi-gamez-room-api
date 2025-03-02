describe("ROOM_SOCKET_API_ENDPOINT variable", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  it("Environment variable not set, returns empty string", async () => {
    // Arrange / Action
    const { ROOM_SOCKET_API_ENDPOINT } = await import(
      "./room-socket-api-endpoint"
    );

    // Assert
    expect(ROOM_SOCKET_API_ENDPOINT).toBe("");
  });

  it("Environment variable is set, returns the number", async () => {
    // Arrange
    process.env.ROOM_SOCKET_API_ENDPOINT = "ws:localhost";

    // / Action
    const { ROOM_SOCKET_API_ENDPOINT } = await import(
      "./room-socket-api-endpoint"
    );

    // Assert
    expect(ROOM_SOCKET_API_ENDPOINT).toBe("ws:localhost");
  });
});
