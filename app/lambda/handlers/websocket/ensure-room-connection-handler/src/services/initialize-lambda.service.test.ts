import {
  initializeEventPublisherForExternal,
  initializeEventPublisherForInternal,
} from "@oigamez/communication";
import { initialize } from "@oigamez/communication";

import { initializeLambda } from "./initialize-lambda.service";

jest.mock("@oigamez/communication");
jest.mock("@oigamez/core", () => {
  return {
    EB_EXTERNAL_EB_NAME: "External Event Bus",
    EB_EXTERNAL_EVENT_SOURCE_NAME: "External Event Bus Source",
    EB_INTERNAL_EB_NAME: "Internal Event Bus",
    EB_INTERNAL_EVENT_SOURCE_NAME: "Internal Event Bus Source",
    ROOM_SOCKET_API_ENDPOINT: "SomeRoomSocketAPIEndpoint",
  };
});

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
