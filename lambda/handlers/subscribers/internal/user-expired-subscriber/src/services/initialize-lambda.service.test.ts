import { initializeEventPublisherForInternal } from "/opt/nodejs/oigamez-communication.js";

import { initializeLambda } from "./initialize-lambda.service.js";

jest.mock("/opt/nodejs/oigamez-communication");
jest.mock("/opt/nodejs/oigamez-core.js", () => {
  return {
    ROOM_SOCKET_API_ENDPOINT: "SomeRoomSocketAPIEndpoint",
    EB_INTERNAL_EB_NAME: "Internal Event Bus",
    EB_INTERNAL_EVENT_SOURCE_NAME: "Internal Event Bus Source",
  };
});

describe("initializeLambda tests for user expired subscription lambda", () => {
  test("Calls initialize function", () => {
    // Arrange / Action
    initializeLambda();

    // Assert
    expect(initializeEventPublisherForInternal).toHaveBeenCalledWith(
      "Internal Event Bus",
      "Internal Event Bus Source"
    );
  });
});
