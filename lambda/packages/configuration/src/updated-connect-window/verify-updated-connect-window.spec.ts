describe("verifyUpdatedConnectWindowInSeconds tests", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it("UPDATED_CONNECT_WINDOW_IN_SECONDS variable not set, throws an error", async () => {
    // Arrange
    const { verifyUpdatedConnectWindowInSeconds } = await import(
      "./verify-updated-connect-window"
    );

    // / Action / Assert
    expect(verifyUpdatedConnectWindowInSeconds).toThrow(
      `UPDATED_CONNECT_WINDOW_IN_SECONDS environment variable is not set`
    );
  });

  it("UPDATED_CONNECT_WINDOW_IN_SECONDS variable is set as a non number, throws an error", async () => {
    // Arrange
    jest.doMock("./updated-connect-window", () => {
      return { UPDATED_CONNECT_WINDOW_IN_SECONDS: "abc" };
    });

    const { verifyUpdatedConnectWindowInSeconds } = await import(
      "./verify-updated-connect-window"
    );

    // / Action / Assert
    expect(verifyUpdatedConnectWindowInSeconds).toThrow(
      `UPDATED_CONNECT_WINDOW_IN_SECONDS environment variable is not set`
    );
  });

  it("UPDATED_CONNECT_WINDOW_IN_SECONDS variable is set as a number, does not throw an error", async () => {
    // Arrange
    jest.doMock("./updated-connect-window", () => {
      return { UPDATED_CONNECT_WINDOW_IN_SECONDS: "100" };
    });

    const { verifyUpdatedConnectWindowInSeconds } = await import(
      "./verify-updated-connect-window"
    );

    // / Action / Assert
    expect(verifyUpdatedConnectWindowInSeconds).not.toThrow(Error);
  });
});
