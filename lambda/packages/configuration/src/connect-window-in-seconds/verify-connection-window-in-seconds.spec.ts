describe("verifyConnectionWindowInSeconds tests", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it("CONNECT_WINDOW_IN_SECONDS variable not set, throws an error", async () => {
    // Arrange
    const { verifyConnectionWindowInSeconds } = await import(
      "./verify-connection-window-in-seconds"
    );

    // / Action / Assert
    expect(verifyConnectionWindowInSeconds)
      .toThrow(`CONNECT_WINDOW_IN_SECONDS environment variable is not set, 
            or not set correctly. Make sure it's set as a positive integer.`);
  });

  it("CONNECT_WINDOW_IN_SECONDS variable is set as a non number, throws an error", async () => {
    // Arrange
    jest.doMock("./connection-window-in-seconds", () => {
      return { CONNECT_WINDOW_IN_SECONDS: "abc" };
    });

    const { verifyConnectionWindowInSeconds } = await import(
      "./verify-connection-window-in-seconds"
    );

    // / Action / Assert
    expect(verifyConnectionWindowInSeconds)
      .toThrow(`CONNECT_WINDOW_IN_SECONDS environment variable is not set, 
            or not set correctly. Make sure it's set as a positive integer.`);
  });

  it("CONNECT_WINDOW_IN_SECONDS variable is set as a number, does not throw an error", async () => {
    // Arrange
    jest.doMock("./connection-window-in-seconds", () => {
      return { CONNECT_WINDOW_IN_SECONDS: "60" };
    });

    const { verifyConnectionWindowInSeconds } = await import(
      "./verify-connection-window-in-seconds"
    );

    // / Action / Assert
    expect(verifyConnectionWindowInSeconds).not.toThrow(Error);
  });
});
