describe("verifyPublicRoomsToRetrieve tests", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("PUBLIC_ROOMS_TO_RETRIEVE variable not set, throws an error", async () => {
    // Arrange
    const { verifyPublicRoomsToRetrieve } = await import(
      "./verify-public-rooms-to-retrieve.js"
    );

    // / Action / Assert
    expect(verifyPublicRoomsToRetrieve).toThrow(
      `PUBLIC_ROOMS_TO_RETRIEVE environment variable is not set`
    );
  });

  test("PUBLIC_ROOMS_TO_RETRIEVE variable is set as a non number, throws an error", async () => {
    // Arrange
    jest.doMock("./public-rooms-to-retrieve", () => {
      return { PUBLIC_ROOMS_TO_RETRIEVE: "abc" };
    });

    const { verifyPublicRoomsToRetrieve } = await import(
      "./verify-public-rooms-to-retrieve.js"
    );

    // / Action / Assert
    expect(verifyPublicRoomsToRetrieve).toThrow(
      `PUBLIC_ROOMS_TO_RETRIEVE environment variable is not set`
    );
  });

  test("PUBLIC_ROOMS_TO_RETRIEVE variable is set as a number, does not throw an error", async () => {
    // Arrange
    jest.doMock("./public-rooms-to-retrieve", () => {
      return { PUBLIC_ROOMS_TO_RETRIEVE: "100" };
    });

    const { verifyPublicRoomsToRetrieve } = await import(
      "./verify-public-rooms-to-retrieve.js"
    );

    // / Action / Assert
    expect(verifyPublicRoomsToRetrieve).not.toThrow(Error);
  });
});
