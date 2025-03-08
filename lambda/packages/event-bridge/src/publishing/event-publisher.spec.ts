import { PutEventsCommand } from "@aws-sdk/client-eventbridge";

import { client } from "../client";
import {
  EventBridgeExternalEvent,
  EventBridgeExternalEventType,
  EventBridgeInternalEvent,
  EventBridgeInternalEventType,
} from "../events";
import {
  publishExternalEvents,
  publishInternalEvents,
} from "./event-publisher";

jest.mock("@oigamez/configuration", () => {
  return {
    EB_EXTERNAL_EB_NAME: "ExternalEbName",
    EB_EXTERNAL_EVENT_SOURCE_NAME: "ExternalEventSourceName",
    EB_INTERNAL_EB_NAME: "InternalEbName",
    EB_INTERNAL_EVENT_SOURCE_NAME: "InternalEventSourceName",
    DYNAMO_TABLE_NAME: "SomeTable",
  };
});

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
  const logSpy = jest.spyOn(console, "log");
  const sendFn = jest.spyOn(client, "send");

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("publishInternalEvents tests", () => {
    it("sends the correct PutEventsCommand to the event bus", async () => {
      // Arrange
      const customEvent = new CustomEventBridgeInternalEvent(
        EventBridgeInternalEventType.userJoined,
        1,
        "testProp"
      );

      sendFn.mockReturnValueOnce({} as any);

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
      ).toBe("InternalEbName");
      expect(
        (sendFn.mock.calls[0][0] as PutEventsCommand).input.Entries![0].Source
      ).toBe("InternalEventSourceName");
      expect(
        (sendFn.mock.calls[0][0] as PutEventsCommand).input.Entries![0].Detail
      ).toEqual(JSON.stringify(customEvent));
      expect(
        (sendFn.mock.calls[0][0] as PutEventsCommand).input.Entries![0]
          .DetailType
      ).toBe("room-internal.user-joined");
    });

    it("logs the error if there is an issue while trying to publish an event", async () => {
      // Arrange
      const randomError = { error: "Test error message" };
      const customEvent = new CustomEventBridgeInternalEvent(
        EventBridgeInternalEventType.userJoined,
        1,
        "testProp"
      );

      sendFn.mockRejectedValueOnce(randomError as never);

      // Action
      await publishInternalEvents([customEvent]);

      // Assert
      expect(logSpy).toHaveBeenCalledWith(
        "Error while trying to send a message to the event bus InternalEbName with source InternalEventSourceName",
        randomError
      );
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
      const sendFn = jest.spyOn(client, "send");

      sendFn.mockReturnValueOnce({} as any);

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
      ).toBe("ExternalEbName");
      expect(
        (sendFn.mock.calls[0][0] as PutEventsCommand).input.Entries![0].Source
      ).toBe("ExternalEventSourceName");
      expect(
        (sendFn.mock.calls[0][0] as PutEventsCommand).input.Entries![0].Detail
      ).toEqual(JSON.stringify(customEvent));
      expect(
        (sendFn.mock.calls[0][0] as PutEventsCommand).input.Entries![0]
          .DetailType
      ).toBe("room.user-joined");
    });

    it("logs the error if there is an issue while trying to publish an event", async () => {
      // Arrange
      const randomError = { error: "Test error message" };
      const customEvent = new CustomEventBridgeExternallEvent(
        EventBridgeExternalEventType.userJoined,
        1,
        "testProp"
      );

      sendFn.mockRejectedValueOnce(randomError as never);

      // Action
      await publishExternalEvents([customEvent]);

      // Assert
      expect(logSpy).toHaveBeenCalledWith(
        "Error while trying to send a message to the event bus ExternalEbName with source ExternalEventSourceName",
        randomError
      );
    });
  });
});
