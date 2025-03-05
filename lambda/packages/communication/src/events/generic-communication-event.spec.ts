import { GenericCommunicationEvent } from "./generic-communication-event";

describe("GenericCommunicationEvent tests", () => {
  it("correct properties is set", () => {
    // Arrange / Action
    const action = "someAction";
    const payload = { name: "daryl" };
    const event = new GenericCommunicationEvent(action, payload);

    // Assert
    expect(event.action).toBe(action);
    expect(event.payload).toEqual(payload);
  });
});
