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

    const hostLambdaFn = new HostConnectionDisconnectionSubscriber(
      this,
      "HostConnectionDisconnectionSubscriber",
      {
        eventBus: props.eventBus,
        connectionTable: props.connectionTable,
      }
    );

    const userLambdaFn = new UserConnectionDisconnectionSubscriber(
      this,
      "UserConnectionDisconnectionSubscriber",
      {
        eventBus: props.eventBus,
        connectionTable: props.connectionTable,
      }
    );

    new Rule(this, "HostDisconnectionSubscriberRule", {
      description:
        "Rule that subscribes to expired connections from the connections table.",
      targets: [
        new aws_events_targets.LambdaFunction(hostLambdaFn.lambdaFunction),
        new aws_events_targets.LambdaFunction(userLambdaFn.lambdaFunction),
      ],
      eventPattern: {
        source: ["room.expired-connection-handler"],
      },
      eventBus: props.eventBus,
    });
  }
}
