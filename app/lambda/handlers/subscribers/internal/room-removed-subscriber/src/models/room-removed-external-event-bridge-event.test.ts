import { RoomRemovedExternalEventBridgeEvent } from "./room-removed-external-event-bridge-event";

describe("RoomRemovedExternalEventBridgeEvent tests", () => {
  test("all props are set correctly", () => {
    // Arrange
    const roomCode = "ABCD";
    const gameTypeId = 1;

    // Action
    const event = new RoomRemovedExternalEventBridgeEvent(roomCode, gameTypeId);

    // Assert
    expect(event).toBeDefined();
    expect(event.roomCode).toBe(roomCode);
    expect(event.gameTypeId).toBe(gameTypeId);
    expect(event.detailType).toBe("room.room-removed");
  });
});
