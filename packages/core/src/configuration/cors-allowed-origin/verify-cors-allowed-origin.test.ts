describe("verifyCorsAllowedOrigin tests", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("CORS_ALLOWED_ORIGINS variable not set, throws an error", async () => {
    // Arrange
    const { verifyCorsAllowedOrigin } = await import(
      "./verify-cors-allowed-origin.js"
    );

    // / Action / Assert
    expect(verifyCorsAllowedOrigin).toThrow(
      "CORS_ALLOWED_ORIGINS environment variable is not set"
    );
  });

  test("CORS_ALLOWED_ORIGINS variable is set, does not throw an error", async () => {
    // Arrange
    jest.doMock("./cors-allowed-origin", () => {
      return { CORS_ALLOWED_ORIGINS: "localhost" };
    });

    const { verifyCorsAllowedOrigin } = await import(
      "./verify-cors-allowed-origin.js"
    );

    // / Action / Assert
    expect(verifyCorsAllowedOrigin).not.toThrow(Error);
  });
});
