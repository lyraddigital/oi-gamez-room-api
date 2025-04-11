describe("EXPIRED_DISCONNECTION_WINDOW_IN_SECONDS variable", () => {
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
    const { EXPIRED_DISCONNECTION_WINDOW_IN_SECONDS } = await import(
      "./expired-disconnection-window-in-seconds.js"
    );

    // Assert
    expect(EXPIRED_DISCONNECTION_WINDOW_IN_SECONDS).toBe(NaN);
  });

  test("Environment variable is set, returns the number", async () => {
    // Arrange
    process.env.EXPIRED_DISCONNECTION_WINDOW_IN_SECONDS = "100";

    // / Action
    const { EXPIRED_DISCONNECTION_WINDOW_IN_SECONDS } = await import(
      "./expired-disconnection-window-in-seconds.js"
    );

    // Assert
    expect(EXPIRED_DISCONNECTION_WINDOW_IN_SECONDS).toBe(100);
  });
});
