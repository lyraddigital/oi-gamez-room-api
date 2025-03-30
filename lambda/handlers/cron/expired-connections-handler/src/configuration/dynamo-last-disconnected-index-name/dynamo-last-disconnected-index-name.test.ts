describe("CONNECTION_DYNAMO_LAST_DISCONNECTED_INDEX_NAME variable", () => {
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
    const { CONNECTION_DYNAMO_LAST_DISCONNECTED_INDEX_NAME } = await import(
      "./dynamo-last-disconnected-index-name"
    );

    // Assert
    expect(CONNECTION_DYNAMO_LAST_DISCONNECTED_INDEX_NAME).toBe("");
  });

  test("Environment variable is set, returns the number", async () => {
    // Arrange
    process.env.CONNECTION_DYNAMO_LAST_DISCONNECTED_INDEX_NAME =
      "LastConnectionIndex";

    // / Action
    const { CONNECTION_DYNAMO_LAST_DISCONNECTED_INDEX_NAME } = await import(
      "./dynamo-last-disconnected-index-name"
    );

    // Assert
    expect(CONNECTION_DYNAMO_LAST_DISCONNECTED_INDEX_NAME).toBe(
      "LastConnectionIndex"
    );
  });
});
