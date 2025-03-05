import { CommunicationActionTypes } from "./communication-action-types";
import { UserLeftCommunicationEvent } from "./user-left-communication-event";

describe("UserLeftCommunicationEvent tests", () => {
  it("correct properties is set", () => {
    // Arrange / Action
    const username = "daryl_duck";
    const event = new UserLeftCommunicationEvent(username);

    // Assert
    expect(event.action).toBe(CommunicationActionTypes.userLeft);
    expect(event.username).toBe(username);
  });
});
