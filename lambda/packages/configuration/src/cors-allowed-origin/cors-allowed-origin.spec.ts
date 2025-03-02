describe("CORS_ALLOWED_ORIGINS variable", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  it("Environment variable not set, returns empty string", async () => {
    // Arrange / Action
    const { CORS_ALLOWED_ORIGINS } = await import("./cors-allowed-origin");

    // Assert
    expect(CORS_ALLOWED_ORIGINS).toBe("");
  });

  it("Environment variable is set, returns the number", async () => {
    // Arrange
    process.env.CORS_ALLOWED_ORIGINS = "localhost";

    // / Action
    const { CORS_ALLOWED_ORIGINS } = await import("./cors-allowed-origin");

    // Assert
    expect(CORS_ALLOWED_ORIGINS).toBe("localhost");
  });
});
