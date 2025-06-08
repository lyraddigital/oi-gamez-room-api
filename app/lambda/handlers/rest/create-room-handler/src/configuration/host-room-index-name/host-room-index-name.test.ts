describe("HOST_ROOM_INDEX_NAME variable", () => {
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
    const { HOST_ROOM_INDEX_NAME } = await import("./host-room-index-name");

    // Assert
    expect(HOST_ROOM_INDEX_NAME).toBe("");
  });

  test("Environment variable is set, returns the number", async () => {
    // Arrange
    process.env.HOST_ROOM_INDEX_NAME = "RoomIndex";

    // / Action
    const { HOST_ROOM_INDEX_NAME } = await import("./host-room-index-name");

    // Assert
    expect(HOST_ROOM_INDEX_NAME).toBe("RoomIndex");
  });
});
