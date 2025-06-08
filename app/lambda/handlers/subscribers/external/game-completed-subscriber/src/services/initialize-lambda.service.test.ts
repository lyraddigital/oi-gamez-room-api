import { initialize } from "@oigamez/communication";

import { initializeLambda } from "./initialize-lambda.service";

jest.mock("@oigamez/core", () => {
  return {
    ROOM_SOCKET_API_ENDPOINT: "SomeRoomSocketAPIEndpoint",
  };
});
jest.mock("@oigamez/communication");

describe("initializeLambda tests for game completed subscription lambda", () => {
  test("Calls initialize function", () => {
    // Arrange / Action
    initializeLambda();

    // Assert
    expect(initialize).toHaveBeenCalledWith("SomeRoomSocketAPIEndpoint");
  });
});
