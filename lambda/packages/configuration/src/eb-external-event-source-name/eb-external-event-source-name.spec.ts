describe("EB_EXTERNAL_EVENT_SOURCE_NAME variable", () => {
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
    const { EB_EXTERNAL_EVENT_SOURCE_NAME } = await import(
      "./eb-external-event-source-name"
    );

    // Assert
    expect(EB_EXTERNAL_EVENT_SOURCE_NAME).toBe("");
  });

  it("Environment variable is set, returns the number", async () => {
    // Arrange
    process.env.EB_EXTERNAL_EVENT_SOURCE_NAME = "External Event Source Name";

    // / Action
    const { EB_EXTERNAL_EVENT_SOURCE_NAME } = await import(
      "./eb-external-event-source-name"
    );

    // Assert
    expect(EB_EXTERNAL_EVENT_SOURCE_NAME).toBe("External Event Source Name");
  });
});
