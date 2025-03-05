import { CommunicationActionTypes } from "./communication-action-types";
import { UserJoinedCommunicationEvent } from "./user-joined-communication-event";

describe("UserJoinedCommunicationEvent tests", () => {
  it("correct properties is set", () => {
    // Arrange / Action
    const username = "daryl_duck";
    const event = new UserJoinedCommunicationEvent(username);

    // Assert
    expect(event.action).toBe(CommunicationActionTypes.userJoined);
    expect(event.username).toBe(username);
  });
});
