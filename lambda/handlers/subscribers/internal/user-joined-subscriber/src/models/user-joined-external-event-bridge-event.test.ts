import { UserJoinedExternalEventBridgeEvent } from "./user-joined-external-event-bridge-event.js";

describe("UserJoinedExternalEventBridgeEvent tests", () => {
  test("all props are set correctly", () => {
    // Arrange
    const roomCode = "ABCD";
    const username = "joined_user";
    const isBelowMinimumUsers = true;
    const gameTypeId = 1;

    // Action
    const event = new UserJoinedExternalEventBridgeEvent(
      roomCode,
      username,
      isBelowMinimumUsers,
      gameTypeId
    );

    // Assert
    expect(event).toBeDefined();
    expect(event.roomCode).toBe(roomCode);
    expect(event.username).toBe(username);
    expect(event.isBelowMinimumUsers).toBe(isBelowMinimumUsers);
    expect(event.gameTypeId).toBe(gameTypeId);
    expect(event.detailType).toBe("room.user-joined");
  });
});
