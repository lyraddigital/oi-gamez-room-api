import {
  EventBridgeInternalEventType,
  UserJoinedInternalEvent,
} from "@oigamez/event-bridge";
import { EventBridgeEvent } from "aws-lambda";

import { handler } from ".";
import {
  communicateUserJoined,
  publishExternalUserJoinedEvent,
} from "./services";

jest.mock("./configuration");
jest.mock("./services");

describe("user joined subscriber handler tests", () => {
  it("makes the correct calls", async () => {
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
      EventBridgeInternalEventType.userJoined,
      UserJoinedInternalEvent
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
