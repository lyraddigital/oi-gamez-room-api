import {
  initializeEventPublisherForExternal,
  initializeEventPublisherForInternal,
} from "/opt/nodejs/oigamez-communication.js";
import { initialize } from "/opt/nodejs/oigamez-communication.js";

import { initializeLambda } from "./initialize-lambda.service.js";

jest.mock("/opt/nodejs/oigamez-communication.js");
jest.mock("/opt/nodejs/oigamez-core.js", () => {
  return {
    EB_EXTERNAL_EB_NAME: "External Event Bus",
    EB_EXTERNAL_EVENT_SOURCE_NAME: "External Event Bus Source",
    EB_INTERNAL_EB_NAME: "Internal Event Bus",
    EB_INTERNAL_EVENT_SOURCE_NAME: "Internal Event Bus Source",
    ROOM_SOCKET_API_ENDPOINT: "SomeRoomSocketAPIEndpoint",
  };
});
jest.mock("/opt/nodejs/oigamez-communication");

describe("initializeLambda tests for game completed subscription lambda", () => {
  test("Calls initialize function", () => {
    // Arrange / Action
    initializeLambda();

    // Assert
    expect(initialize).toHaveBeenCalledWith("SomeRoomSocketAPIEndpoint");
    expect(initializeEventPublisherForExternal).toHaveBeenCalledWith(
      "External Event Bus",
      "External Event Bus Source"
    );
    expect(initializeEventPublisherForInternal).toHaveBeenCalledWith(
      "Internal Event Bus",
      "Internal Event Bus Source"
    );
  });
});
