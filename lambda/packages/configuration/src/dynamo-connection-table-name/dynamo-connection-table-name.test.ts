describe("CONNECTION_DYNAMO_TABLE_NAME variable", () => {
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
    const { CONNECTION_DYNAMO_TABLE_NAME } = await import(
      "./dynamo-connection-table-name"
    );

    // Assert
    expect(CONNECTION_DYNAMO_TABLE_NAME).toBe("");
  });

  test("Environment variable is set, returns the number", async () => {
    // Arrange
    process.env.CONNECTION_DYNAMO_TABLE_NAME = "ConnectionTable";

    // / Action
    const { CONNECTION_DYNAMO_TABLE_NAME } = await import(
      "./dynamo-connection-table-name"
    );

    // Assert
    expect(CONNECTION_DYNAMO_TABLE_NAME).toBe("ConnectionTable");
  });
});
