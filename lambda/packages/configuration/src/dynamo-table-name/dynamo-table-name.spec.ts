describe("DYNAMO_TABLE_NAME variable", () => {
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
    const { DYNAMO_TABLE_NAME } = await import("./dynamo-table-name");

    // Assert
    expect(DYNAMO_TABLE_NAME).toBe("");
  });

  it("Environment variable is set, returns the number", async () => {
    // Arrange
    process.env.DYNAMO_TABLE_NAME = "MainTable";

    // / Action
    const { DYNAMO_TABLE_NAME } = await import("./dynamo-table-name");

    // Assert
    expect(DYNAMO_TABLE_NAME).toBe("MainTable");
  });
});
