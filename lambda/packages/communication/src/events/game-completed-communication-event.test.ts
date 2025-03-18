import { CommunicationActionTypes } from "./communication-action-types";
import { GameCompletedCommunicationEvent } from "./game-completed-communication-event";

describe("GameCompletedCommunicationEvent tests", () => {
  test("correct properties is set", () => {
    // Arrange / Action
    const event = new GameCompletedCommunicationEvent();

    // Assert
    expect(event.action).toBe(CommunicationActionTypes.gameCompleted);
  });
});
