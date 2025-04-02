import { initialize } from "@oigamez/communication";
import { initializeEventPublisherForExternal } from "@oigamez/event-bridge";

import { initializeLambda } from "./initialize-lambda.service";

jest.mock("@oigamez/communication");
jest.mock("@oigamez/event-bridge");
jest.mock("/opt/nodejs/oigamez-core", () => {
  return {
    ROOM_SOCKET_API_ENDPOINT: "SomeRoomSocketAPIEndpoint",
    EB_EXTERNAL_EB_NAME: "External Event Bus",
    EB_EXTERNAL_EVENT_SOURCE_NAME: "External Event Bus Source",
  };
});

describe("initializeLambda tests for room removed subscription lambda", () => {
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
