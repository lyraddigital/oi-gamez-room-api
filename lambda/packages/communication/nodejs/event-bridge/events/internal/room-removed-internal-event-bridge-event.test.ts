import { RoomRemovedInternalEventBridgeEvent } from "./room-removed-internal-event-bridge-event";

describe("RoomRemovedInternalEventBridgeEvent tests", () => {
  test("all props are set correctly", () => {
    // Arrange
    const roomCode = "ABCD";
    const hostConnectionId = "conn1234";
    const gameTypeId = 1;

    // Action
    const event = new RoomRemovedInternalEventBridgeEvent(
      roomCode,
      hostConnectionId,
      gameTypeId
    );

    // Assert
    expect(event).toBeDefined();
    expect(event.roomCode).toBe(roomCode);
    expect(event.hostConnectionId).toBe(hostConnectionId);
    expect(event.gameTypeId).toBe(gameTypeId);
    expect(event.detailType).toBe("room-internal.room-removed");
  });
});
