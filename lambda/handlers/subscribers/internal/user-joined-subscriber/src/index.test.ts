import { EventBridgeEvent } from "aws-lambda";

import { UserJoinedInternalEventBridgeEvent } from "/opt/nodejs/oigamez-communication";

import { handler } from ".";
import {
  communicateUserJoined,
  publishExternalUserJoinedEvent,
} from "./services";

jest.mock("./configuration");
jest.mock("./services");

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
