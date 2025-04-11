describe("verifyDynamoTableName tests", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("DYNAMO_TABLE_NAME variable not set, throws an error", async () => {
    // Arrange
    const { verifyDynamoTableName } = await import(
      "./verify-dynamo-table-name.js"
    );

    // / Action / Assert
    expect(verifyDynamoTableName).toThrow(
      "DYNAMO_TABLE_NAME environment variable is not set"
    );
  });

  test("DYNAMO_TABLE_NAME variable is set, does not throw an error", async () => {
    // Arrange
    jest.doMock("./dynamo-table-name.js", () => {
      return {
        DYNAMO_TABLE_NAME: "SomeTable",
      };
    });

    const { verifyDynamoTableName } = await import(
      "./verify-dynamo-table-name.js"
    );

    // / Action / Assert
    expect(verifyDynamoTableName).not.toThrow(Error);
  });
});
