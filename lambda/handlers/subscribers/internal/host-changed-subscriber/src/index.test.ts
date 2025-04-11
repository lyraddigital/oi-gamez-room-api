import { EventBridgeEvent } from "aws-lambda";

import { HostChangeInternalEventBridgeEvent } from "@oigamez/communication";

import { handler } from "./index.js";
import {
  communicateHostChanged,
  publishExternalHostChangedEvent,
} from "./services/index.js";

jest.mock("./configuration/index.js");
jest.mock("./services/index.js");

describe("host changed subscriber handler tests", () => {
  test("makes the correct calls", async () => {
    // Arrange
    const roomCode = "ABCD";
    const oldHostUsername = "daryl_duck";
    const newHostUsername = "daryl_duck2";
    const gameTypeId = 1;
    const event = {
      detail: {
        roomCode,
        oldHostUsername,
        newHostUsername,
        gameTypeId,
      },
    } as EventBridgeEvent<
      "room-internal.change-host",
      HostChangeInternalEventBridgeEvent
    >;

    // Action
    await handler(event);

    // Assert
    expect(communicateHostChanged).toHaveBeenCalledWith(
      roomCode,
      oldHostUsername,
      newHostUsername
    );
    expect(publishExternalHostChangedEvent).toHaveBeenCalledWith(
      roomCode,
      oldHostUsername,
      newHostUsername,
      gameTypeId
    );
  });
});
