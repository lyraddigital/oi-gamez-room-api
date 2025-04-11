describe("verifyEncryptionIV tests", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("ENCRYPTION_IV variable not set, throws an error", async () => {
    // Arrange
    const { verifyEncryptionIV } = await import("./verify-encryption-iv.js");

    // / Action / Assert
    expect(verifyEncryptionIV).toThrow(
      "ENCRYPTION_IV environment variable is not set"
    );
  });

  test("ENCRYPTION_IV variable is set, does not throw an error", async () => {
    // Arrange
    jest.doMock("./encryption-iv", () => {
      return {
        ENCRYPTION_IV: "SecretIV",
      };
    });

    const { verifyEncryptionIV } = await import("./verify-encryption-iv.js");

    // Action / Assert
    expect(verifyEncryptionIV).not.toThrow(Error);
  });
});
