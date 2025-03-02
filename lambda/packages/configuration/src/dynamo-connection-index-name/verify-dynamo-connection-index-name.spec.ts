describe("verifyDynamoConnectionIndexName tests", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it("CONNECTION_DYNAMO_INDEX_NAME variable not set, throws an error", async () => {
    // Arrange
    const { verifyDynamoConnectionIndexName } = await import(
      "./verify-dynamo-connection-index-name"
    );

    // / Action / Assert
    expect(verifyDynamoConnectionIndexName).toThrow(
      "CONNECTION_DYNAMO_INDEX_NAME environment variable is not set"
    );
  });

  it("CONNECTION_DYNAMO_INDEX_NAME variable is set, does not throw an error", async () => {
    // Arrange
    jest.doMock("./dynamo-connection-index-name", () => {
      return { CONNECTION_DYNAMO_INDEX_NAME: "ConnectionIndex" };
    });

    const { verifyDynamoConnectionIndexName } = await import(
      "./verify-dynamo-connection-index-name"
    );

    // / Action / Assert
    expect(verifyDynamoConnectionIndexName).not.toThrow(Error);
  });
});
