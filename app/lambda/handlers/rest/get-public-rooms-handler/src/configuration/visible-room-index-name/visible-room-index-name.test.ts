describe("VISIBLE_ROOM_INDEX_NAME variable", () => {
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
    const { VISIBLE_ROOM_INDEX_NAME } = await import(
      "./visible-room-index-name"
    );

    // Assert
    expect(VISIBLE_ROOM_INDEX_NAME).toBe("");
  });

  test("Environment variable is set, returns the number", async () => {
    // Arrange
    process.env.VISIBLE_ROOM_INDEX_NAME = "VisibleRoomIndex";

    // / Action
    const { VISIBLE_ROOM_INDEX_NAME } = await import(
      "./visible-room-index-name"
    );

    // Assert
    expect(VISIBLE_ROOM_INDEX_NAME).toBe("VisibleRoomIndex");
  });
});
