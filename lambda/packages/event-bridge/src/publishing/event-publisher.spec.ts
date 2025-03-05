import { PutEventsCommand } from "@aws-sdk/client-eventbridge";
import {
  EventBridgeExternalEvent,
  EventBridgeExternalEventType,
  EventBridgeInternalEvent,
  EventBridgeInternalEventType,
} from "../events";
import {
  EB_EXTERNAL_EB_NAME,
  EB_EXTERNAL_EVENT_SOURCE_NAME,
  EB_INTERNAL_EB_NAME,
  EB_INTERNAL_EVENT_SOURCE_NAME,
} from "@oigamez/configuration";

class CustomEventBridgeInternalEvent extends EventBridgeInternalEvent {
  constructor(
    public detailType: EventBridgeInternalEventType,
    public gameTypeId: number,
    public customProp: string
  ) {
    super(detailType, gameTypeId);
  }
}

class CustomEventBridgeExternallEvent extends EventBridgeExternalEvent {
  constructor(
    public detailType: EventBridgeExternalEventType,
    public gameTypeId: number,
    public customProp: string
  ) {
    super(detailType, gameTypeId);
  }
}

describe("event publisher tests", () => {
  let sendFn = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.mock("../client", () => {
      return {
        client: {
          send: sendFn,
        },
      };
    });
  });

  describe("publishInternalEvents tests", () => {
    it("sends the correct PutEventsCommand to the event bus", async () => {
      // Arrange
      const customEvent = new CustomEventBridgeInternalEvent(
        EventBridgeInternalEventType.userJoined,
        1,
        "testProp"
      );

      sendFn.mockImplementationOnce(() => Promise.resolve());

      const { publishInternalEvents } = await import("./event-publisher");

      // Action
      await publishInternalEvents([customEvent]);

      // Assert
      expect(sendFn.mock.calls.length).toBe(1);
      expect(sendFn.mock.calls[0][0]).toBeDefined();
      expect(
        (sendFn.mock.calls[0][0] as PutEventsCommand).input?.Entries
      ).toBeDefined();
      expect(
        (sendFn.mock.calls[0][0] as PutEventsCommand).input.Entries!.length
      ).toBe(1);
      expect(
        (sendFn.mock.calls[0][0] as PutEventsCommand).input.Entries![0]
          .EventBusName
      ).toBe(EB_INTERNAL_EB_NAME);
      expect(
        (sendFn.mock.calls[0][0] as PutEventsCommand).input.Entries![0].Source
      ).toBe(EB_INTERNAL_EVENT_SOURCE_NAME);
      expect(
        (sendFn.mock.calls[0][0] as PutEventsCommand).input.Entries![0].Detail
      ).toEqual(JSON.stringify(customEvent));
      expect(
        (sendFn.mock.calls[0][0] as PutEventsCommand).input.Entries![0]
          .DetailType
      ).toBe("room-internal.user-joined");
    });
  });

  describe("publishExternalEvents tests", () => {
    it("sends the correct PutEventsCommand to the event bus", async () => {
      // Arrange
      const customEvent = new CustomEventBridgeExternallEvent(
        EventBridgeExternalEventType.userJoined,
        1,
        "testProp"
      );

      sendFn.mockImplementationOnce(() => Promise.resolve());

      const { publishExternalEvents } = await import("./event-publisher");

      // Action
      await publishExternalEvents([customEvent]);

      // Assert
      expect(sendFn.mock.calls.length).toBe(1);
      expect(sendFn.mock.calls[0][0]).toBeDefined();
      expect(
        (sendFn.mock.calls[0][0] as PutEventsCommand).input?.Entries
      ).toBeDefined();
      expect(
        (sendFn.mock.calls[0][0] as PutEventsCommand).input.Entries!.length
      ).toBe(1);
      expect(
        (sendFn.mock.calls[0][0] as PutEventsCommand).input.Entries![0]
          .EventBusName
      ).toBe(EB_EXTERNAL_EB_NAME);
      expect(
        (sendFn.mock.calls[0][0] as PutEventsCommand).input.Entries![0].Source
      ).toBe(EB_EXTERNAL_EVENT_SOURCE_NAME);
      expect(
        (sendFn.mock.calls[0][0] as PutEventsCommand).input.Entries![0].Detail
      ).toEqual(JSON.stringify(customEvent));
      expect(
        (sendFn.mock.calls[0][0] as PutEventsCommand).input.Entries![0]
          .DetailType
      ).toBe("room.user-joined");
    });
  });
});
