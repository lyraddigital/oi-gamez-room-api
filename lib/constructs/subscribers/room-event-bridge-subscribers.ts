import { aws_events_targets } from "aws-cdk-lib";
import { Rule } from "aws-cdk-lib/aws-events";
import { Construct } from "constructs";

import { EventTypes } from "../../constants";
import { RoomEventBridgeSubscribersProps } from "../../props";

import { HostExpiredSubscriber } from "./host-expired-subscriber";
import { UserExpiredSubscriber } from "./user-expired-subscriber";
import { RoomRemovedSubscriber } from "./room-removed-subscriber";
import { UserJoinedSubscriber } from "./user-joined-subscriber";
import { UserLeftSubscriber } from "./user-left-subscriber";

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
        roomEventBus: props.eventBus,
        eventBusEventSourceName: props.eventBusSourceName,
      }
    );

    const userExpiredLambdaFn = new UserExpiredSubscriber(
      this,
      "UserExpiredSubscriber",
      {
        table: props.table,
        connectionTable: props.connectionTable,
        roomEventBus: props.eventBus,
        eventBusEventSourceName: props.eventBusSourceName,
      }
    );

    const roomRemovedLambdaFn = new RoomRemovedSubscriber(
      this,
      "RoomRemovedSubscriber",
      {
        connectionTable: props.connectionTable,
        roomWebsocketApiPostArn: props.roomWebsocketApiPostArn,
        roomSocketApiEndpoint: props.roomSocketApiEndpoint,
      }
    );

    const userJoinedLambdaFn = new UserJoinedSubscriber(
      this,
      "UserJoinedSubscriber",
      {
        connectionTable: props.connectionTable,
        roomWebsocketApiPostArn: props.roomWebsocketApiPostArn,
        roomSocketApiEndpoint: props.roomSocketApiEndpoint,
      }
    );

    const userLeftLambdaFn = new UserLeftSubscriber(
      this,
      "UserLeftSubscriber",
      {
        connectionTable: props.connectionTable,
        roomWebsocketApiPostArn: props.roomWebsocketApiPostArn,
        roomSocketApiEndpoint: props.roomSocketApiEndpoint,
        roomWebsocketApiDeleteArn: props.roomWebsocketApiDeleteArn,
      }
    );

    new Rule(this, "HostExpiredSubscriberRule", {
      description:
        "Rule that subscribes to an expired host in the connections table.",
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
        "Rule that subscribes to an expired user in the connections table.",
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

    new Rule(this, "RoomRemovedSubscriberRule", {
      description:
        "Rule that subscribes to a room being removed from the rooms table.",
      targets: [
        new aws_events_targets.LambdaFunction(
          roomRemovedLambdaFn.lambdaFunction
        ),
      ],
      eventPattern: {
        source: [props.eventBusSourceName],
        detailType: [EventTypes.roomRemoved],
      },
      eventBus: props.eventBus,
    });

    new Rule(this, "UserJoinedSubscriberRule", {
      description:
        "Rule that subscribes to a user being added to the connections table for the first time.",
      targets: [
        new aws_events_targets.LambdaFunction(
          userJoinedLambdaFn.lambdaFunction
        ),
      ],
      eventPattern: {
        source: [props.eventBusSourceName],
        detailType: [EventTypes.userJoined],
      },
      eventBus: props.eventBus,
    });

    new Rule(this, "UserLeftSubscriberRule", {
      description:
        "Rule that subscribes to a user being removed from the connections table.",
      targets: [
        new aws_events_targets.LambdaFunction(userLeftLambdaFn.lambdaFunction),
      ],
      eventPattern: {
        source: [props.eventBusSourceName],
        detailType: [EventTypes.userLeft],
      },
      eventBus: props.eventBus,
    });
  }
}
