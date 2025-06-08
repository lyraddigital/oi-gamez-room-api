import { HostChangeExternalEventBridgeEvent } from "./host-change-external-event-bridge-event";

describe("HostChangeExternalEventBridgeEvent tests", () => {
  test("all props are set correctly", () => {
    // Arrange
    const roomCode = "ABCD";
    const oldHostUsername = "host_one";
    const newHostUsername = "host_two";
    const gameTypeId = 1;

    // Action
    const event = new HostChangeExternalEventBridgeEvent(
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
    expect(event.detailType).toBe("room.host-changed");
  });
});
