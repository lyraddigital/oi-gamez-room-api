describe("verifyJwtExpiryInMinutes tests", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("JWT_EXPIRY_IN_MINUTES variable not set, throws an error", async () => {
    // Arrange
    const { verifyJwtExpiryInMinutes } = await import(
      "./verify-jwt-expiry-in-minutes"
    );

    // / Action / Assert
    expect(verifyJwtExpiryInMinutes)
      .toThrow(`JWT_EXPIRY_IN_MINUTES environment variable is not set, 
            or not set correctly. Make sure it's set as a positive integer.`);
  });

  test("JWT_EXPIRY_IN_MINUTES variable is set as a non number, throws an error", async () => {
    // Arrange
    jest.doMock("./jwt-expiry-in-minutes", () => {
      return { JWT_EXPIRY_IN_MINUTES: "abc" };
    });

    const { verifyJwtExpiryInMinutes } = await import(
      "./verify-jwt-expiry-in-minutes"
    );

    // / Action / Assert
    expect(verifyJwtExpiryInMinutes)
      .toThrow(`JWT_EXPIRY_IN_MINUTES environment variable is not set, 
            or not set correctly. Make sure it's set as a positive integer.`);
  });

  test("JWT_EXPIRY_IN_MINUTES variable is set as a number, does not throw an error", async () => {
    // Arrange
    jest.doMock("./jwt-expiry-in-minutes", () => {
      return { JWT_EXPIRY_IN_MINUTES: 60 };
    });

    const { verifyJwtExpiryInMinutes } = await import(
      "./verify-jwt-expiry-in-minutes"
    );

    // / Action / Assert
    expect(verifyJwtExpiryInMinutes).not.toThrow(Error);
  });
});
