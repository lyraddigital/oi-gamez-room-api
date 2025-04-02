import { PutEventsCommand } from "@aws-sdk/client-eventbridge";

import { client } from "../client";
import { EventBridgeEvent } from "../events";
import {
  EventBridgePublishingOptions,
  getPublishingOptions,
} from "./publishing-options";
import {
  publishExternalEvents,
  publishInternalEvents,
} from "./event-publisher";

jest.mock("./publishing-options");

class CustomEventBridgeInternalEventBridgeEvent extends EventBridgeEvent {
  constructor(
    public detailType: string,
    public gameTypeId: number,
    public customProp: string
  ) {
    super(detailType, gameTypeId);
  }
}

class CustomEventBridgeExternallEventBridgeEvent extends EventBridgeEvent {
  constructor(
    public detailType: string,
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
    test("sends the correct PutEventsCommand to the event bus", async () => {
      // Arrange
      const publishingOptions = {
        internalEventBusName: "InternalEbName",
        internalEventBusSourceName: "InternalEventSourceName",
      } as EventBridgePublishingOptions;
      const customEvent = new CustomEventBridgeInternalEventBridgeEvent(
        "room-internal.user-joined",
        1,
        "testProp"
      );
      (
        getPublishingOptions as jest.MockedFunction<typeof getPublishingOptions>
      ).mockReturnValueOnce(publishingOptions);

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
      ).toBe(publishingOptions.internalEventBusName);
      expect(
        (sendFn.mock.calls[0][0] as PutEventsCommand).input.Entries![0].Source
      ).toBe(publishingOptions.internalEventBusSourceName);
      expect(
        (sendFn.mock.calls[0][0] as PutEventsCommand).input.Entries![0].Detail
      ).toEqual(JSON.stringify(customEvent));
      expect(
        (sendFn.mock.calls[0][0] as PutEventsCommand).input.Entries![0]
          .DetailType
      ).toBe("room-internal.user-joined");
      expect(getPublishingOptions).toHaveBeenCalled();
    });

    test("logs the error if there is an issue while trying to publish an event", async () => {
      // Arrange
      const publishingOptions = {
        internalEventBusName: "InternalEbName",
        internalEventBusSourceName: "InternalEventSourceName",
      } as EventBridgePublishingOptions;
      const randomError = { error: "Test error message" };
      const customEvent = new CustomEventBridgeInternalEventBridgeEvent(
        "room-internal.user-joined",
        1,
        "testProp"
      );
      (
        getPublishingOptions as jest.MockedFunction<typeof getPublishingOptions>
      ).mockReturnValueOnce(publishingOptions);

      sendFn.mockRejectedValueOnce(randomError as never);

      // Action
      await publishInternalEvents([customEvent]);

      // Assert
      expect(logSpy).toHaveBeenCalledWith(
        "Error while trying to send a message to the event bus InternalEbName with source InternalEventSourceName",
        randomError
      );
      expect(getPublishingOptions).toHaveBeenCalled();
    });
  });

  describe("publishExternalEvents tests", () => {
    test("sends the correct PutEventsCommand to the event bus", async () => {
      // Arrange
      const publishingOptions = {
        externalEventBusName: "ExternalEbName",
        externalEventBusSourceName: "ExternalEventSourceName",
      } as EventBridgePublishingOptions;
      const customEvent = new CustomEventBridgeExternallEventBridgeEvent(
        "room.random-event",
        1,
        "testProp"
      );
      (
        getPublishingOptions as jest.MockedFunction<typeof getPublishingOptions>
      ).mockReturnValueOnce(publishingOptions);
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
      ).toBe(publishingOptions.externalEventBusName);
      expect(
        (sendFn.mock.calls[0][0] as PutEventsCommand).input.Entries![0].Source
      ).toBe(publishingOptions.externalEventBusSourceName);
      expect(
        (sendFn.mock.calls[0][0] as PutEventsCommand).input.Entries![0].Detail
      ).toEqual(JSON.stringify(customEvent));
      expect(
        (sendFn.mock.calls[0][0] as PutEventsCommand).input.Entries![0]
          .DetailType
      ).toBe("room.random-event");
      expect(getPublishingOptions).toHaveBeenCalled();
    });

    test("logs the error if there is an issue while trying to publish an event", async () => {
      // Arrange
      const publishingOptions = {
        externalEventBusName: "ExternalEbName",
        externalEventBusSourceName: "ExternalEventSourceName",
      } as EventBridgePublishingOptions;
      const randomError = { error: "Test error message" };
      const customEvent = new CustomEventBridgeExternallEventBridgeEvent(
        "room.random-event",
        1,
        "testProp"
      );
      (
        getPublishingOptions as jest.MockedFunction<typeof getPublishingOptions>
      ).mockReturnValueOnce(publishingOptions);

      sendFn.mockRejectedValueOnce(randomError as never);

      // Action
      await publishExternalEvents([customEvent]);

      // Assert
      expect(logSpy).toHaveBeenCalledWith(
        "Error while trying to send a message to the event bus ExternalEbName with source ExternalEventSourceName",
        randomError
      );
      expect(getPublishingOptions).toHaveBeenCalled();
    });
  });
});
