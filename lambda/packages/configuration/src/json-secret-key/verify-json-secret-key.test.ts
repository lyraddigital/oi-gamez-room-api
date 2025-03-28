describe("verifyJwtSecretKey tests", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("JWT_SECRET_KEY variable not set, throws an error", async () => {
    // Arrange
    const { verifyJwtSecretKey } = await import("./verify-json-secret-key");

    // / Action / Assert
    expect(verifyJwtSecretKey).toThrow(
      "JWT_SECRET_KEY environment variable is not set"
    );
  });

  test("JWT_SECRET_KEY variable is set, does not throw an error", async () => {
    // Arrange
    jest.doMock("./json-secret-key", () => {
      return {
        JWT_SECRET_KEY: "SecretKey",
      };
    });

    const { verifyJwtSecretKey } = await import("./verify-json-secret-key");

    // Action / Assert
    expect(verifyJwtSecretKey).not.toThrow(Error);
  });
});
