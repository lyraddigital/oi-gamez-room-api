import {
  getPublishingOptions,
  initializeEventPublisherForExternal,
  initializeEventPublisherForInternal,
} from "./publishing-options";

describe("publishing options tests", () => {
  it("initializeEventPublisherForInternal sets the correct publishing options", () => {
    // Arrange
    const internalEventBusName = "Internal Event Bus";
    const internalEventBusSourceName = "Internal Event Bus Source";

    // Action
    initializeEventPublisherForInternal(
      internalEventBusName,
      internalEventBusSourceName
    );

    // Assert
    const publishingOptions = getPublishingOptions();

    expect(publishingOptions).toBeDefined();
    expect(publishingOptions.internalEventBusName).toBe(internalEventBusName);
    expect(publishingOptions.internalEventBusSourceName).toBe(
      internalEventBusSourceName
    );
  });

  it("initializeEventPublisherForExternal sets the correct publishing options", () => {
    // Arrange
    const externalEventBusName = "External Event Bus";
    const externalEventBusSourceName = "External Event Bus Source";

    // Action
    initializeEventPublisherForExternal(
      externalEventBusName,
      externalEventBusSourceName
    );

    // Assert
    const publishingOptions = getPublishingOptions();

    expect(publishingOptions).toBeDefined();
    expect(publishingOptions.externalEventBusName).toBe(externalEventBusName);
    expect(publishingOptions.externalEventBusSourceName).toBe(
      externalEventBusSourceName
    );
  });
});
