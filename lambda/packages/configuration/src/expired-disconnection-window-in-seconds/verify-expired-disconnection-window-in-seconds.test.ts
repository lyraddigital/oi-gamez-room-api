describe("verifyExpiredDisconnectionWindowInSeconds tests", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("EXPIRED_DISCONNECTION_WINDOW_IN_SECONDS variable not set, throws an error", async () => {
    // Arrange
    const { verifyExpiredDisconnectionWindowInSeconds } = await import(
      "./verify-expired-disconnection-window-in-seconds"
    );

    // / Action / Assert
    expect(verifyExpiredDisconnectionWindowInSeconds)
      .toThrow(`EXPIRED_DISCONNECTION_WINDOW_IN_SECONDS environment variable is not set, 
            or not set correctly. Make sure it's set as a positive integer.`);
  });

  test("EXPIRED_DISCONNECTION_WINDOW_IN_SECONDS variable is set as a non number, throws an error", async () => {
    // Arrange
    jest.doMock("./expired-disconnection-window-in-seconds", () => {
      return { CONNECT_WINDOW_IN_SECONDS: "abc" };
    });

    const { verifyExpiredDisconnectionWindowInSeconds } = await import(
      "./verify-expired-disconnection-window-in-seconds"
    );

    // / Action / Assert
    expect(verifyExpiredDisconnectionWindowInSeconds)
      .toThrow(`EXPIRED_DISCONNECTION_WINDOW_IN_SECONDS environment variable is not set, 
            or not set correctly. Make sure it's set as a positive integer.`);
  });

  test("EXPIRED_DISCONNECTION_WINDOW_IN_SECONDS variable is set as a number, does not throw an error", async () => {
    // Arrange
    jest.doMock("./expired-disconnection-window-in-seconds", () => {
      return { EXPIRED_DISCONNECTION_WINDOW_IN_SECONDS: "60" };
    });

    const { verifyExpiredDisconnectionWindowInSeconds } = await import(
      "./verify-expired-disconnection-window-in-seconds"
    );

    // / Action / Assert
    expect(verifyExpiredDisconnectionWindowInSeconds).not.toThrow(Error);
  });
});
