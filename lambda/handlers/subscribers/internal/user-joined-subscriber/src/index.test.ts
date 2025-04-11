import { EventBridgeEvent } from "aws-lambda";

import { UserJoinedInternalEventBridgeEvent } from "@oigamez/communication";

import { handler } from "./index.js";
import {
  communicateUserJoined,
  publishExternalUserJoinedEvent,
} from "./services/index.js";

jest.mock("./configuration/index.js");
jest.mock("./services/index.js");

describe("user joined subscriber handler tests", () => {
  test("makes the correct calls", async () => {
    // Arrange
    const roomCode = "ABCD";
    const username = "daryl_duck";
    const gameTypeId = 1;
    const event = {
      detail: {
        roomCode,
        username,
        gameTypeId,
      },
    } as EventBridgeEvent<
      "room-internal.user-joined",
      UserJoinedInternalEventBridgeEvent
    >;

    // Action
    await handler(event);

    // Assert
    expect(communicateUserJoined).toHaveBeenCalledWith(roomCode, username);
    expect(publishExternalUserJoinedEvent).toHaveBeenCalledWith(
      roomCode,
      username,
      gameTypeId
    );
  });
});
