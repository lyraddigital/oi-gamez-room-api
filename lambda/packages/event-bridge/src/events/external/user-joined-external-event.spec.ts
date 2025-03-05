import { EventBridgeExternalEventType } from "./types";
import { UserJoinedExternalEvent } from "./user-joined-external-event";

describe("UserJoinedExternalEvent tests", () => {
  it("all props are set correctly", () => {
    // Arrange
    const roomCode = "ABCD";
    const username = "joined_user";
    const isBelowMinimumUsers = true;
    const gameTypeId = 1;

    // Action
    const event = new UserJoinedExternalEvent(
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
    expect(event.detailType).toBe(EventBridgeExternalEventType.userJoined);
  });
});
