import { RoomRemovedInternalEvent } from "@oigamez/event-bridge";
import { EventBridgeEvent } from "aws-lambda";

import { handler } from ".";
import {
  communicateRoomRemoved,
  publishExternalRoomRemovedEvent,
} from "./services";

jest.mock("./configuration");
jest.mock("./services");

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
      RoomRemovedInternalEvent
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
