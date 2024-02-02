export enum EventBridgeInternalEventType {
  expiredConnections = "room-internal.expired-connections",
  hostConnectionExpired = "room-internal.host-connection-expired",
  userConnectionExpired = "room-internal.user-connection-expired",
  userJoined = "room-internal.user-joined",
  userLeft = "room-internal.user-left",
  roomRemoved = "room-internal.room-removed",
  hostChanged = "room-internal.change-host",
}
