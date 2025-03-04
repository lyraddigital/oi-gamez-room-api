import { CommunicationActionTypes } from "./communication-action-types";
import { HostChangeCommunicationEvent } from "./change-host-communication-event";

describe("HostChangeCommunicationEvent tests", () => {
  it("correct properties is set", () => {
    // Arrange
    const oldHostname = "old_user";
    const newHostName = "new_user";

    // Action
    const event = new HostChangeCommunicationEvent(oldHostname, newHostName);

    // Assert
    expect(event.action).toBe(CommunicationActionTypes.changeHost);
    expect(event.oldHostname).toBe(oldHostname);
    expect(event.newHostName).toBe(newHostName);
  });
});
