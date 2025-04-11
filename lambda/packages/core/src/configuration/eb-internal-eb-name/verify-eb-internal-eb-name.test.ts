describe("verifyEbName tests", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("EB_INTERNAL_EB_NAME variable not set, throws an error", async () => {
    // Arrange
    const { verifyEbName } = await import("./verify-eb-internal-eb-name.js");

    // / Action / Assert
    expect(verifyEbName).toThrow(
      "EB_INTERNAL_EB_NAME environment variable is not set"
    );
  });

  test("EB_INTERNAL_EB_NAME variable is set, does not throw an error", async () => {
    // Arrange
    jest.doMock("./eb-internal-eb-name", () => {
      return {
        EB_INTERNAL_EB_NAME: "Internal Event Bus Name",
      };
    });

    const { verifyEbName } = await import("./verify-eb-internal-eb-name.js");

    // Action / Assert
    expect(verifyEbName).not.toThrow(Error);
  });
});
