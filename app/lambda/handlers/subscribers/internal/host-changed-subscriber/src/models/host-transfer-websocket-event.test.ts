import { HostTransferWebsocketEvent } from "./host-transfer-websocket-event";

describe("HostTransferWebsocketEvent tests", () => {
  test("correct properties is set", () => {
    // Arrange / Action
    const event = new HostTransferWebsocketEvent();

    // Assert
    expect(event.action).toBe("hostTransfer");
  });
});
