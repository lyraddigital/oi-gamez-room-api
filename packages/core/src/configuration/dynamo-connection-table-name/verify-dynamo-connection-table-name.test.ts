describe("verifyDynamoConnectionTableName tests", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("CONNECTION_DYNAMO_TABLE_NAME variable not set, throws an error", async () => {
    // Arrange
    const { verifyDynamoConnectionTableName } = await import(
      "./verify-dynamo-connection-table-name.js"
    );

    // / Action / Assert
    expect(verifyDynamoConnectionTableName).toThrow(
      "CONNECTION_DYNAMO_TABLE_NAME environment variable is not set"
    );
  });

  test("CONNECTION_DYNAMO_TABLE_NAME variable is set, does not throw an error", async () => {
    // Arrange
    jest.doMock("./dynamo-connection-table-name", () => {
      return { CONNECTION_DYNAMO_TABLE_NAME: "ConnectionTable" };
    });

    const { verifyDynamoConnectionTableName } = await import(
      "./verify-dynamo-connection-table-name.js"
    );

    // / Action / Assert
    expect(verifyDynamoConnectionTableName).not.toThrow(Error);
  });
});
