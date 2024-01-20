import { Construct } from "constructs";

import { RoomEventBridgeSubscribersProps } from "../../props";

import { HostConnectionDisconnectionSubscriber } from "./host-connection-disconnection-subscriber";

export class RoomEventBridgeSubscribers extends Construct {
  constructor(
    scope: Construct,
    id: string,
    props: RoomEventBridgeSubscribersProps
  ) {
    super(scope, id);

    new HostConnectionDisconnectionSubscriber(
      this,
      "HostConnectionDisconnectionSubscriber",
      {
        eventBus: props.eventBus,
        connectionTable: props.connectionTable,
      }
    );
  }
}
