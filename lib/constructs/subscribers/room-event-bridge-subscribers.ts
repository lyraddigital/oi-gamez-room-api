import { aws_events_targets } from "aws-cdk-lib";
import { Rule } from "aws-cdk-lib/aws-events";
import { Construct } from "constructs";

import { EventTypes } from "../../constants";
import { RoomEventBridgeSubscribersProps } from "../../props";

import { HostExpiredSubscriber } from "./host-expired-subscriber";
import { UserExpiredSubscriber } from "./user-expired-subscriber";

export class RoomEventBridgeSubscribers extends Construct {
  constructor(
    scope: Construct,
    id: string,
    props: RoomEventBridgeSubscribersProps
  ) {
    super(scope, id);

    const hostExpiredLambdaFn = new HostExpiredSubscriber(
      this,
      "HostExpiredSubscriber",
      {
        table: props.table,
        connectionTable: props.connectionTable,
      }
    );

    const userExpiredLambdaFn = new UserExpiredSubscriber(
      this,
      "UserExpiredSubscriberProps",
      {
        table: props.table,
        connectionTable: props.connectionTable,
      }
    );

    new Rule(this, "HostExpiredSubscriberRule", {
      description:
        "Rule that subscribes to a host being removed from the connections table.",
      targets: [
        new aws_events_targets.LambdaFunction(
          hostExpiredLambdaFn.lambdaFunction
        ),
      ],
      eventPattern: {
        source: [props.eventBusSourceName],
        detailType: [EventTypes.hostConnectionExpired],
      },
      eventBus: props.eventBus,
    });

    new Rule(this, "UserExpiredSubscriberRule", {
      description:
        "Rule that subscribes to a user being removed from the connections table.",
      targets: [
        new aws_events_targets.LambdaFunction(
          userExpiredLambdaFn.lambdaFunction
        ),
      ],
      eventPattern: {
        source: [props.eventBusSourceName],
        detailType: [EventTypes.userConnectionExpired],
      },
      eventBus: props.eventBus,
    });
  }
}
