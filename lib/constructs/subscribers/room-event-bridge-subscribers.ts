import { aws_events_targets } from "aws-cdk-lib";
import { Rule } from "aws-cdk-lib/aws-events";
import { Construct } from "constructs";

import { EventTypes } from "../../constants";
import { RoomEventBridgeSubscribersProps } from "../../props";

import { HostRemovedSubscriber } from "./host-removed-subscriber";
import { UserRemovedSubscriber } from "./user-removed-subscriber";

export class RoomEventBridgeSubscribers extends Construct {
  constructor(
    scope: Construct,
    id: string,
    props: RoomEventBridgeSubscribersProps
  ) {
    super(scope, id);

    const hostRemovedLambdaFn = new HostRemovedSubscriber(
      this,
      "HostRemovedSubscriber",
      {
        table: props.table,
        connectionTable: props.connectionTable,
      }
    );

    const userRemovedLambdaFn = new UserRemovedSubscriber(
      this,
      "UserRemovedSubscriberProps",
      {
        table: props.table,
        connectionTable: props.connectionTable,
      }
    );

    new Rule(this, "HostRemovedSubscriberRule", {
      description:
        "Rule that subscribes to a host being removed from the connections table.",
      targets: [
        new aws_events_targets.LambdaFunction(
          hostRemovedLambdaFn.lambdaFunction
        ),
      ],
      eventPattern: {
        source: [props.eventBusSourceName],
        detailType: [EventTypes.hostRemoved],
      },
      eventBus: props.eventBus,
    });

    new Rule(this, "UserRemovedSubscriberRule", {
      description:
        "Rule that subscribes to a user being removed from the connections table.",
      targets: [
        new aws_events_targets.LambdaFunction(
          userRemovedLambdaFn.lambdaFunction
        ),
      ],
      eventPattern: {
        source: [props.eventBusSourceName],
        detailType: [EventTypes.userRemoved],
      },
      eventBus: props.eventBus,
    });
  }
}
