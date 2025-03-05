import { CommunicationActionTypes } from "./communication-action-types";
import { GameInitializedCommunicationEvent } from "./game-initialized-communication-event";

describe("GameInitializedCommunicationEvent tests", () => {
  it("correct properties is set", () => {
    // Arrange / Action
    const event = new GameInitializedCommunicationEvent();

    // Assert
    expect(event.action).toBe(CommunicationActionTypes.gameInitialized);
  });
});
