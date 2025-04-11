describe("UPDATED_CONNECT_WINDOW_IN_SECONDS variable", () => {
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
    const { UPDATED_CONNECT_WINDOW_IN_SECONDS } = await import(
      "./updated-connect-window.js"
    );

    // Assert
    expect(UPDATED_CONNECT_WINDOW_IN_SECONDS).toBe(NaN);
  });

  test("Environment variable is set, returns the number", async () => {
    // Arrange
    process.env.UPDATED_CONNECT_WINDOW_IN_SECONDS = "100";

    // / Action
    const { UPDATED_CONNECT_WINDOW_IN_SECONDS } = await import(
      "./updated-connect-window.js"
    );

    // Assert
    expect(UPDATED_CONNECT_WINDOW_IN_SECONDS).toBe(100);
  });
});
