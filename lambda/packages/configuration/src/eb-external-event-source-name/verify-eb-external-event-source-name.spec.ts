describe("verifyEbExternalEventSourceName tests", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it("EB_EXTERNAL_EVENT_SOURCE_NAME variable not set, throws an error", async () => {
    // Arrange
    const { verifyEbExternalEventSourceName } = await import(
      "./verify-eb-external-event-source-name"
    );

    // / Action / Assert
    expect(verifyEbExternalEventSourceName).toThrow(
      "EB_EXTERNAL_EVENT_SOURCE_NAME environment variable is not set"
    );
  });

  it("EB_EXTERNAL_EVENT_SOURCE_NAME variable is set, does not throw an error", async () => {
    // Arrange
    jest.doMock("./eb-external-event-source-name", () => {
      return {
        EB_EXTERNAL_EVENT_SOURCE_NAME: "Event Bus Name",
      };
    });

    const { verifyEbExternalEventSourceName } = await import(
      "./verify-eb-external-event-source-name"
    );

    // Action / Assert
    expect(verifyEbExternalEventSourceName).not.toThrow(Error);
  });
});
