import { HostConnectionExpiredInternalEventBridgeEvent } from "./host-connection-expired-internal-event-bridge-event";

describe("HostConnectionExpiredInternalEventBridgeEvent tests", () => {
  test("all props are set correctly", () => {
    // Arrange
    const roomCode = "ABCD";
    const username = "host_user";
    const shouldRemoveRoom = true;
    const gameTypeId = 1;

    // Action
    const event = new HostConnectionExpiredInternalEventBridgeEvent(
      roomCode,
      username,
      shouldRemoveRoom,
      gameTypeId
    );

    // Assert
    expect(event).toBeDefined();
    expect(event.roomCode).toBe(roomCode);
    expect(event.username).toBe(username);
    expect(event.shouldRemoveRoom).toBe(shouldRemoveRoom);
    expect(event.gameTypeId).toBe(gameTypeId);
    expect(event.detailType).toBe("room-internal.host-connection-expired");
  });
});
