import { HostChangeWebsocketEvent } from "./change-host-websocket-event";

describe("HostChangeCommunicationEvent tests", () => {
  test("correct properties is set", () => {
    // Arrange
    const oldHostname = "old_user";
    const newHostName = "new_user";

    // Action
    const event = new HostChangeWebsocketEvent(oldHostname, newHostName);

    // Assert
    expect(event.action).toBe("changeHost");
    expect(event.oldHostname).toBe(oldHostname);
    expect(event.newHostName).toBe(newHostName);
  });
});
