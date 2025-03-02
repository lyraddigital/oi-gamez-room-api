describe("PUBLIC_ROOMS_TO_RETRIEVE variable", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  it("Environment variable not set, returns NaN", async () => {
    // Arrange / Action
    const { PUBLIC_ROOMS_TO_RETRIEVE } = await import(
      "./public-rooms-to-retrieve"
    );

    // Assert
    expect(PUBLIC_ROOMS_TO_RETRIEVE).toBe(NaN);
  });

  it("Environment variable is set, returns the number", async () => {
    // Arrange
    process.env.PUBLIC_ROOMS_TO_RETRIEVE = "100";

    // / Action
    const { PUBLIC_ROOMS_TO_RETRIEVE } = await import(
      "./public-rooms-to-retrieve"
    );

    // Assert
    expect(PUBLIC_ROOMS_TO_RETRIEVE).toBe(100);
  });
});
