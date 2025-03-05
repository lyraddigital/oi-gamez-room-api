import { CommunicationActionTypes } from "./communication-action-types";
import { EnableGameStartCommunicationEvent } from "./enable-game-start-communication-event";

describe("EnableGameStartCommunicationEvent tests", () => {
  it("correct properties is set", () => {
    // Arrange / Action
    const event = new EnableGameStartCommunicationEvent();

    // Assert
    expect(event.action).toBe(CommunicationActionTypes.enableGameStart);
  });
});
