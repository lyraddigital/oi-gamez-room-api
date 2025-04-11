import { initialize } from "/opt/nodejs/oigamez-communication.js";

import { initializeLambda } from "./initialize-lambda.service.js";

jest.mock("/opt/nodejs/oigamez-core.js", () => {
  return {
    ROOM_SOCKET_API_ENDPOINT: "SomeRoomSocketAPIEndpoint",
  };
});
jest.mock("/opt/nodejs/oigamez-communication");

describe("initializeLambda tests for game initialized subscription lambda", () => {
  test("Calls initialize function", () => {
    // Arrange / Action
    initializeLambda();

    // Assert
    expect(initialize).toHaveBeenCalledWith("SomeRoomSocketAPIEndpoint");
  });
});
