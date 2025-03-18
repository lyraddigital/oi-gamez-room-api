import { EventBridgeInternalEventType } from "./types";
import { UserLeftInternalEvent } from "./user-left-internal-event";

describe("UserLeftInternalEvent tests", () => {
  test("all props are set correctly", () => {
    // Arrange
    const roomCode = "ABCD";
    const username = "joined_user";
    const connectionId = "conn1234";
    const gameTypeId = 1;

    // Action
    const event = new UserLeftInternalEvent(
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
    expect(event.detailType).toBe(EventBridgeInternalEventType.userLeft);
  });

  test("connection id is undefined, sets the connection id prop successfully", () => {
    // Arrange
    const roomCode = "ABCD";
    const username = "joined_user";
    const gameTypeId = 1;

    // Action
    const event = new UserLeftInternalEvent(
      roomCode,
      username,
      undefined,
      gameTypeId
    );

    // Assert
    expect(event.connectionId).toBeUndefined();
  });
});
