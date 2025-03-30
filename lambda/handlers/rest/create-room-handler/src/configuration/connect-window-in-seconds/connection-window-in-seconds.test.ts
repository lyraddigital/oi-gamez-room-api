describe("CONNECT_WINDOW_IN_SECONDS variable tests", () => {
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
    const { CONNECT_WINDOW_IN_SECONDS } = await import(
      "./connection-window-in-seconds"
    );

    // Assert
    expect(CONNECT_WINDOW_IN_SECONDS).toBe(NaN);
  });

  test("Environment variable is set, returns the number", async () => {
    // Arrange
    process.env.CONNECT_WINDOW_IN_SECONDS = "100";

    // / Action
    const { CONNECT_WINDOW_IN_SECONDS } = await import(
      "./connection-window-in-seconds"
    );

    // Assert
    expect(CONNECT_WINDOW_IN_SECONDS).toBe(100);
  });
});
