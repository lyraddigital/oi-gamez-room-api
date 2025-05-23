import { UserConnectionExpiredInternalEventBridgeEvent } from "./user-connection-expired-internal-event-bridge-event.js";

describe("UserConnectionExpiredInternalEventBridgeEvent tests", () => {
  test("all props are set correctly", () => {
    // Arrange
    const roomCode = "ABCD";
    const username = "some_user";
    const gameTypeId = 1;

    // Action
    const event = new UserConnectionExpiredInternalEventBridgeEvent(
      roomCode,
      username,
      gameTypeId
    );

    // Assert
    expect(event).toBeDefined();
    expect(event.roomCode).toBe(roomCode);
    expect(event.username).toBe(username);
    expect(event.gameTypeId).toBe(gameTypeId);
    expect(event.detailType).toBe("room-internal.user-connection-expired");
  });
});
