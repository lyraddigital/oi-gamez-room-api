import { EventBridgeEvent } from "aws-lambda";

import { RoomRemovedInternalEventBridgeEvent } from "/opt/nodejs/oigamez-communication.js";

import { handler } from "./index.js";
import {
  communicateRoomRemoved,
  publishExternalRoomRemovedEvent,
} from "./services/index.js";

jest.mock("./configuration/index.js");
jest.mock("./services/index.js");

describe("room removed subscriber handler tests", () => {
  test("makes the correct calls", async () => {
    // Arrange
    const roomCode = "ABCD";
    const gameTypeId = 1;
    const hostConnectionId = "conn1234";
    const event = {
      detail: {
        roomCode,
        hostConnectionId,
        gameTypeId,
      },
    } as EventBridgeEvent<
      "room-internal.room-removed",
      RoomRemovedInternalEventBridgeEvent
    >;

    // Action
    await handler(event);

    // Assert
    expect(communicateRoomRemoved).toHaveBeenCalledWith(hostConnectionId);
    expect(publishExternalRoomRemovedEvent).toHaveBeenCalledWith(
      roomCode,
      gameTypeId
    );
  });
});
