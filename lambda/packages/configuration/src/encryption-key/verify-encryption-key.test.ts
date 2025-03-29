describe("verifyJwtSecretKey tests", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("ENCRYPTION_KEY variable not set, throws an error", async () => {
    // Arrange
    const { verifyEncryptionKey } = await import("./verify-encryption-key");

    // / Action / Assert
    expect(verifyEncryptionKey).toThrow(
      "ENCRYPTION_KEY environment variable is not set"
    );
  });

  test("ENCRYPTION_KEY variable is set, but is not 32 bytes long, throws an error", async () => {
    // Arrange
    jest.doMock("./encryption-key", () => {
      return {
        ENCRYPTION_KEY: "SecretKey",
      };
    });

    const { verifyEncryptionKey } = await import("./verify-encryption-key");

    // Action / Assert
    expect(verifyEncryptionKey).toThrow(
      "ENCRYPTION_KEY environment variable must be 32 bytes"
    );
  });

  test("ENCRYPTION_KEY variable is set, does not throw an error", async () => {
    // Arrange
    jest.doMock("./encryption-key", () => {
      return {
        ENCRYPTION_KEY: "CorrectSizedKeyabcdefghijklmnopq",
      };
    });

    const { verifyEncryptionKey } = await import("./verify-encryption-key");

    // Action / Assert
    expect(verifyEncryptionKey).not.toThrow(Error);
  });
});
