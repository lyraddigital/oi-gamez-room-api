import { RoomCreatedExternalEventBridgeEvent } from "./room-created-external-event-bridge-event";

describe("RoomCreatedExternalEventBridgeEvent tests", () => {
  test("all props are set correctly", () => {
    // Arrange
    const roomCode = "ABCD";
    const hostUsername = "some_host";
    const gameTypeId = 1;

    // Action
    const event = new RoomCreatedExternalEventBridgeEvent(
      roomCode,
      hostUsername,
      gameTypeId
    );

    // Assert
    expect(event).toBeDefined();
    expect(event.roomCode).toBe(roomCode);
    expect(event.hostUsername).toBe(hostUsername);
    expect(event.gameTypeId).toBe(gameTypeId);
    expect(event.detailType).toBe("room.room-created");
  });
});
