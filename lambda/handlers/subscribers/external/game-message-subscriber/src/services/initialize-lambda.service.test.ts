import { initialize } from "@oigamez/communication";

import { initializeLambda } from "./initialize-lambda.service.js";

jest.mock("@oigamez/communication");
jest.mock("@oigamez/core", () => {
  return {
    ROOM_SOCKET_API_ENDPOINT: "SomeRoomSocketAPIEndpoint",
  };
});

describe("initializeLambda tests for game completed subscription lambda", () => {
  test("Calls initialize function", () => {
    // Arrange / Action
    initializeLambda();

    // Assert
    expect(initialize).toHaveBeenCalledWith("SomeRoomSocketAPIEndpoint");
  });
});
