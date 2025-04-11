import { getClient, initialize } from "./client.js";

describe("communication client tests", () => {
  test("returns undefined when calling getClient if initialize is not previously called", () => {
    // Arrange / Action
    const client = getClient();

    // Assert
    expect(client).toBeUndefined();
  });

  test("returns a client when calling getClient if initialize was previously called", () => {
    // Arrange
    const endpoint = "someEnpointDoesnotmatter";

    initialize(endpoint);

    // Action
    const client = getClient();

    // Assert
    expect(client).toBeDefined();
  });
});
