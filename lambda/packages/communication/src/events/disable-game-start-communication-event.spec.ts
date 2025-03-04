import { CommunicationActionTypes } from "./communication-action-types";
import { DisableGameStartCommunicationEvent } from "./disable-game-start-communication-event";

describe("DisableGameStartCommunicationEvent tests", () => {
  it("correct properties is set", () => {
    // Arrange / Action
    const event = new DisableGameStartCommunicationEvent();

    // Assert
    expect(event.action).toBe(CommunicationActionTypes.disableGameStart);
  });
});
