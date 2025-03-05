import { EventBridgeInternalEventType } from "./types";
import { HostChangeInternalEvent } from "./host-change-internal-event";

describe("HostChangeInternalEvent tests", () => {
  it("all props are set correctly", () => {
    // Arrange
    const roomCode = "ABCD";
    const oldHostUsername = "old_host";
    const newHostUsername = "new_host";
    const gameTypeId = 1;

    // Action
    const event = new HostChangeInternalEvent(
      roomCode,
      oldHostUsername,
      newHostUsername,
      gameTypeId
    );

    // Assert
    expect(event).toBeDefined();
    expect(event.roomCode).toBe(roomCode);
    expect(event.oldHostUsername).toBe(oldHostUsername);
    expect(event.newHostUsername).toBe(newHostUsername);
    expect(event.gameTypeId).toBe(gameTypeId);
    expect(event.detailType).toBe(EventBridgeInternalEventType.hostChanged);
  });
});
