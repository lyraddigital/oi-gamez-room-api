describe("JWT_SECRET_KEY variable", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  test("Environment variable not set, returns empty string", async () => {
    // Arrange / Action
    const { JWT_SECRET_KEY } = await import("./json-secret-key");

    // Assert
    expect(JWT_SECRET_KEY).toBe("");
  });

  test("Environment variable is set, returns the number", async () => {
    // Arrange
    process.env.JWT_SECRET_KEY = "SomeKey";

    // / Action
    const { JWT_SECRET_KEY } = await import("./json-secret-key");

    // Assert
    expect(JWT_SECRET_KEY).toBe("SomeKey");
  });
});
