import { CommunicationActionTypes } from "./communication-action-types";
import { HostTransferCommunicationEvent } from "./host-transfer-communication-event";

describe("HostTransferCommunicationEvent tests", () => {
  it("correct properties is set", () => {
    // Arrange / Action
    const event = new HostTransferCommunicationEvent();

    // Assert
    expect(event.action).toBe(CommunicationActionTypes.hostTransfer);
  });
});
