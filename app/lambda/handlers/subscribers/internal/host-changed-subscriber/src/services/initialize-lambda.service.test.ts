import {
  initialize,
  initializeEventPublisherForExternal,
} from "@oigamez/communication";

import { initializeLambda } from "./initialize-lambda.service";

jest.mock("@oigamez/communication");
jest.mock("@oigamez/core", () => {
  return {
    ROOM_SOCKET_API_ENDPOINT: "SomeRoomSocketAPIEndpoint",
    EB_EXTERNAL_EB_NAME: "External Event Bus",
    EB_EXTERNAL_EVENT_SOURCE_NAME: "External Event Bus Source",
  };
});
jest.mock("@oigamez/communication");

describe("initializeLambda tests for host changed subscription lambda", () => {
  test("Calls initialize function", () => {
    // Arrange / Action
    initializeLambda();

    // Assert
    expect(initialize).toHaveBeenCalledWith("SomeRoomSocketAPIEndpoint");
    expect(initializeEventPublisherForExternal).toHaveBeenCalledWith(
      "External Event Bus",
      "External Event Bus Source"
    );
  });
});
