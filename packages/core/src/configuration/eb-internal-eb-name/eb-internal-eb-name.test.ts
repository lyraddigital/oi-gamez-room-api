describe("EB_INTERNAL_EB_NAME variable", () => {
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
    const { EB_INTERNAL_EB_NAME } = await import("./eb-internal-eb-name.js");

    // Assert
    expect(EB_INTERNAL_EB_NAME).toBe("");
  });

  test("Environment variable is set, returns the number", async () => {
    // Arrange
    process.env.EB_INTERNAL_EB_NAME = "Internal Event Bus Name";

    // / Action
    const { EB_INTERNAL_EB_NAME } = await import("./eb-internal-eb-name.js");

    // Assert
    expect(EB_INTERNAL_EB_NAME).toBe("Internal Event Bus Name");
  });
});
