export type EventBridgePublishingOptions = {
  externalEventBusName?: string;
  externalEventBusSourceName?: string;
  internalEventBusName?: string;
  internalEventBusSourceName?: string;
};

let publishingOptions: EventBridgePublishingOptions = {};

export const initializeEventPublisherForInternal = (
  internalEventBusName: string,
  internalEventBusSourceName: string
) => {
  publishingOptions.internalEventBusName = internalEventBusName;
  publishingOptions.internalEventBusSourceName = internalEventBusSourceName;
};

export const initializeEventPublisherForExternal = (
  externalEventBusName: string,
  externalEventBusSourceName: string
) => {
  publishingOptions.externalEventBusName = externalEventBusName;
  publishingOptions.externalEventBusSourceName = externalEventBusSourceName;
};

export const getPublishingOptions = (): EventBridgePublishingOptions => {
  return publishingOptions;
};
