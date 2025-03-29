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
    const { ENCRYPTION_IV } = await import("./encryption-iv");

    // Assert
    expect(ENCRYPTION_IV).toBe("");
  });

  test("Environment variable is set, returns the number", async () => {
    // Arrange
    process.env.ENCRYPTION_IV = "SomeIV";

    // / Action
    const { ENCRYPTION_IV } = await import("./encryption-iv");

    // Assert
    expect(ENCRYPTION_IV).toBe("SomeIV");
  });
});
