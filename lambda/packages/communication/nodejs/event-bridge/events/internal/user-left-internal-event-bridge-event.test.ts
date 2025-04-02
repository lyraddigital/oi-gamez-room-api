import { UserLeftInternalEventBridgeEvent } from "./user-left-internal-event-bridge-event";

describe("UserLeftInternalEventBridgeEvent tests", () => {
  test("all props are set correctly", () => {
    // Arrange
    const roomCode = "ABCD";
    const username = "joined_user";
    const connectionId = "conn1234";
    const gameTypeId = 1;

    // Action
    const event = new UserLeftInternalEventBridgeEvent(
      roomCode,
      username,
      connectionId,
      gameTypeId
    );

    // Assert
    expect(event).toBeDefined();
    expect(event.roomCode).toBe(roomCode);
    expect(event.username).toBe(username);
    expect(event.connectionId).toBe(connectionId);
    expect(event.gameTypeId).toBe(gameTypeId);
    expect(event.detailType).toBe("room-internal.user-left");
  });

  test("connection id is undefined, sets the connection id prop successfully", () => {
    // Arrange
    const roomCode = "ABCD";
    const username = "joined_user";
    const gameTypeId = 1;

    // Action
    const event = new UserLeftInternalEventBridgeEvent(
      roomCode,
      username,
      undefined,
      gameTypeId
    );

    // Assert
    expect(event.connectionId).toBeUndefined();
  });
});
