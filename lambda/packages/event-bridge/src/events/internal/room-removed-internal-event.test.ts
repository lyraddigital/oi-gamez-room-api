import { EventBridgeInternalEventType } from "./types";
import { RoomRemovedInternalEvent } from "./room-removed-internal-event";

describe("RoomRemovedInternalEvent tests", () => {
  test("all props are set correctly", () => {
    // Arrange
    const roomCode = "ABCD";
    const hostConnectionId = "conn1234";
    const gameTypeId = 1;

    // Action
    const event = new RoomRemovedInternalEvent(
      roomCode,
      hostConnectionId,
      gameTypeId
    );

    // Assert
    expect(event).toBeDefined();
    expect(event.roomCode).toBe(roomCode);
    expect(event.hostConnectionId).toBe(hostConnectionId);
    expect(event.gameTypeId).toBe(gameTypeId);
    expect(event.detailType).toBe(EventBridgeInternalEventType.roomRemoved);
  });
});
