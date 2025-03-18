describe("EB_EXTERNAL_EB_NAME variable", () => {
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
    const { EB_EXTERNAL_EB_NAME } = await import("./eb-external-eb-name");

    // Assert
    expect(EB_EXTERNAL_EB_NAME).toBe("");
  });

  test("Environment variable is set, returns the number", async () => {
    // Arrange
    process.env.EB_EXTERNAL_EB_NAME = "External Event Bus Name";

    // / Action
    const { EB_EXTERNAL_EB_NAME } = await import("./eb-external-eb-name");

    // Assert
    expect(EB_EXTERNAL_EB_NAME).toBe("External Event Bus Name");
  });
});
