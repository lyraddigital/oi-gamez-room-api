describe("verifyEbInternalEventSourceName tests", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("EB_INTERNAL_EVENT_SOURCE_NAME variable not set, throws an error", async () => {
    // Arrange
    const { verifyEbInternalEventSourceName } = await import(
      "./verify-eb-internal-event-source-name.js"
    );

    // / Action / Assert
    expect(verifyEbInternalEventSourceName).toThrow(
      "EB_INTERNAL_EVENT_SOURCE_NAME environment variable is not set"
    );
  });

  test("EB_INTERNAL_EVENT_SOURCE_NAME variable is set, does not throw an error", async () => {
    // Arrange
    jest.doMock("./eb-internal-event-source-name", () => {
      return {
        EB_INTERNAL_EVENT_SOURCE_NAME: "Internal Event Bus Name",
      };
    });

    const { verifyEbInternalEventSourceName } = await import(
      "./verify-eb-internal-event-source-name.js"
    );

    // Action / Assert
    expect(verifyEbInternalEventSourceName).not.toThrow(Error);
  });
});
