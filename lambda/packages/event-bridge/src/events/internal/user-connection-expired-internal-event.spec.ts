import { EventBridgeInternalEventType } from "./types";
import { UserConnectionExpiredInternalEvent } from "./user-connection-expired-internal-event";

describe("UserConnectionExpiredInternalEvent tests", () => {
  it("all props are set correctly", () => {
    // Arrange
    const roomCode = "ABCD";
    const username = "some_user";
    const gameTypeId = 1;

    // Action
    const event = new UserConnectionExpiredInternalEvent(
      roomCode,
      username,
      gameTypeId
    );

    // Assert
    expect(event).toBeDefined();
    expect(event.roomCode).toBe(roomCode);
    expect(event.username).toBe(username);
    expect(event.gameTypeId).toBe(gameTypeId);
    expect(event.detailType).toBe(
      EventBridgeInternalEventType.userConnectionExpired
    );
  });
});
