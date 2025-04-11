describe("CONNECTION_DYNAMO_INDEX_NAME variable", () => {
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
    const { CONNECTION_DYNAMO_INDEX_NAME } = await import(
      "./dynamo-connection-index-name.js"
    );

    // Assert
    expect(CONNECTION_DYNAMO_INDEX_NAME).toBe("");
  });

  test("Environment variable is set, returns the number", async () => {
    // Arrange
    process.env.CONNECTION_DYNAMO_INDEX_NAME = "ConnectionIndex";

    // / Action
    const { CONNECTION_DYNAMO_INDEX_NAME } = await import(
      "./dynamo-connection-index-name.js"
    );

    // Assert
    expect(CONNECTION_DYNAMO_INDEX_NAME).toBe("ConnectionIndex");
  });
});
