describe("JWT_EXPIRY_IN_MINUTES variable tests", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  test("Environment variable not set, returns NaN", async () => {
    // Arrange / Action
    const { JWT_EXPIRY_IN_MINUTES } = await import(
      "./jwt-expiry-in-minutes.js"
    );

    // Assert
    expect(JWT_EXPIRY_IN_MINUTES).toBe(NaN);
  });

  test("Environment variable is set, returns the number", async () => {
    // Arrange
    process.env.JWT_EXPIRY_IN_MINUTES = "5";

    // / Action
    const { JWT_EXPIRY_IN_MINUTES } = await import(
      "./jwt-expiry-in-minutes.js"
    );

    // Assert
    expect(JWT_EXPIRY_IN_MINUTES).toBe(5);
  });
});
