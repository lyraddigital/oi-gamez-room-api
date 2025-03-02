describe("verifyExternalEbName tests", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it("EB_EXTERNAL_EB_NAME variable not set, throws an error", async () => {
    // Arrange
    const { verifyExternalEbName } = await import(
      "./verify-eb-external-eb-name"
    );

    // / Action / Assert
    expect(verifyExternalEbName).toThrow(
      "EB_EXTERNAL_EB_NAME environment variable is not set"
    );
  });

  it("EB_EXTERNAL_EB_NAME variable is set, does not throw an error", async () => {
    // Arrange
    jest.doMock("./eb-external-eb-name", () => {
      return {
        EB_EXTERNAL_EB_NAME: "Event Bus Name",
      };
    });

    const { verifyExternalEbName } = await import(
      "./verify-eb-external-eb-name"
    );

    // Action / Assert
    expect(verifyExternalEbName).not.toThrow(Error);
  });
});
