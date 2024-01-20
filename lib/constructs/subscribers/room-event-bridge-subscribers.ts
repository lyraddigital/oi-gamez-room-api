import { Construct } from "constructs";

import { RoomEventBridgeSubscribersProps } from "../../props";

import { RoomConnectionDisconnectionSubscriber } from "./room-connection-disconnection-subscriber";

export class RoomEventBridgeSubscribers extends Construct {
  constructor(
    scope: Construct,
    id: string,
    props: RoomEventBridgeSubscribersProps
  ) {
    super(scope, id);

    new RoomConnectionDisconnectionSubscriber(
      this,
      "RoomConnectionDisconnectionSubscriber",
      {
        eventBus: props.eventBus,
        connectionTable: props.connectionTable,
      }
    );
  }
}
