describe("ROOM_SOCKET_API_ENDPOINT variable", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  test("Environment variable not set, returns empty string", async () => {
    // Arrange / Action
    const { ROOM_SOCKET_API_ENDPOINT } = await import(
      "./room-socket-api-endpoint.js"
    );

    // Assert
    expect(ROOM_SOCKET_API_ENDPOINT).toBe("");
  });

  test("Environment variable is set, returns the number", async () => {
    // Arrange
    process.env.ROOM_SOCKET_API_ENDPOINT = "ws:localhost";

    // / Action
    const { ROOM_SOCKET_API_ENDPOINT } = await import(
      "./room-socket-api-endpoint.js"
    );

    // Assert
    expect(ROOM_SOCKET_API_ENDPOINT).toBe("ws:localhost");
  });
});
