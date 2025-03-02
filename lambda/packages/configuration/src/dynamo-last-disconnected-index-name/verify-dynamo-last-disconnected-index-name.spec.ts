describe("verifyDynamoConnectionTableName tests", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it("CONNECTION_DYNAMO_LAST_DISCONNECTED_INDEX_NAME variable not set, throws an error", async () => {
    // Arrange
    const { verifyDynamoLastDisconnectedIndexName } = await import(
      "./verify-dynamo-last-disconnected-index-name"
    );

    // / Action / Assert
    expect(verifyDynamoLastDisconnectedIndexName).toThrow(
      "CONNECTION_DYNAMO_LAST_DISCONNECTED_INDEX_NAME environment variable is not set"
    );
  });

  it("CONNECTION_DYNAMO_LAST_DISCONNECTED_INDEX_NAME variable is set, does not throw an error", async () => {
    // Arrange
    jest.doMock("./dynamo-last-disconnected-index-name", () => {
      return {
        CONNECTION_DYNAMO_LAST_DISCONNECTED_INDEX_NAME:
          "LastDisconnectionIndex",
      };
    });

    const { verifyDynamoLastDisconnectedIndexName } = await import(
      "./verify-dynamo-last-disconnected-index-name"
    );

    // / Action / Assert
    expect(verifyDynamoLastDisconnectedIndexName).not.toThrow(Error);
  });
});
