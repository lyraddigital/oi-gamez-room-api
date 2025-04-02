import { UserJoinedInternalEvent } from "./user-joined-internal-event";

describe("UserJoinedInternalEvent tests", () => {
  test("all props are set correctly", () => {
    // Arrange
    const roomCode = "ABCD";
    const username = "joined_user";
    const gameTypeId = 1;

    // Action
    const event = new UserJoinedInternalEvent(roomCode, username, gameTypeId);

    // Assert
    expect(event).toBeDefined();
    expect(event.roomCode).toBe(roomCode);
    expect(event.username).toBe(username);
    expect(event.gameTypeId).toBe(gameTypeId);
    expect(event.detailType).toBe("room-internal.user-joined");
  });
});
