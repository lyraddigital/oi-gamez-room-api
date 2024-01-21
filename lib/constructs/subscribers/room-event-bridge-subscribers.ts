import { aws_events_targets } from "aws-cdk-lib";
import { Rule } from "aws-cdk-lib/aws-events";
import { Construct } from "constructs";

import { RoomEventBridgeSubscribersProps } from "../../props";

import { HostConnectionDisconnectionSubscriber } from "./host-connection-disconnection-subscriber";
import { UserConnectionDisconnectionSubscriber } from "./user-connection-disconnection-subscriber";

export class RoomEventBridgeSubscribers extends Construct {
  constructor(
    scope: Construct,
    id: string,
    props: RoomEventBridgeSubscribersProps
  ) {
    super(scope, id);

    const hostConnectionDisconnectLambdaFn =
      new HostConnectionDisconnectionSubscriber(
        this,
        "HostConnectionDisconnectionSubscriber",
        {
          table: props.table,
          connectionTable: props.connectionTable,
        }
      );

    const userConnectionDisconnectLambdaFn =
      new UserConnectionDisconnectionSubscriber(
        this,
        "UserConnectionDisconnectionSubscriber",
        {
          table: props.table,
          connectionTable: props.connectionTable,
        }
      );

    new Rule(this, "HostConnectionDisconnectionSubscriberRule", {
      description:
        "Rule that subscribes to expired host connections from the connections table.",
      targets: [
        new aws_events_targets.LambdaFunction(
          hostConnectionDisconnectLambdaFn.lambdaFunction
        ),
      ],
      eventPattern: {
        source: ["room.expired-connection-handler"],
        detailType: ["room.host-disconnection"],
      },
      eventBus: props.eventBus,
    });

    new Rule(this, "UserDisconnectionSubscriberRule", {
      description:
        "Rule that subscribes to expired user connections from the connections table.",
      targets: [
        new aws_events_targets.LambdaFunction(
          userConnectionDisconnectLambdaFn.lambdaFunction
        ),
      ],
      eventPattern: {
        source: ["room.expired-connection-handler"],
        detailType: ["room.user-disconnection"],
      },
      eventBus: props.eventBus,
    });
  }
}
