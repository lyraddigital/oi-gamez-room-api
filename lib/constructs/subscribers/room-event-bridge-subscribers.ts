import { aws_events_targets } from "aws-cdk-lib";
import { Rule } from "aws-cdk-lib/aws-events";
import { Construct } from "constructs";

import { EventTypes } from "../../constants/index.js";
import { RoomEventBridgeSubscribersProps } from "../../props/index.js";

import {
  HostChangedSubscriber,
  HostExpiredSubscriber,
  UserExpiredSubscriber,
  RoomRemovedSubscriber,
  UserJoinedSubscriber,
  UserLeftSubscriber,
} from "./internal/index.js";
import {
  GameCompletedSubscriber,
  GameInitializedSubscriber,
  GameMessageSubscriber,
  GameStartedSubscriber,
} from "./external/index.js";

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
        layers: [props.coreLayer],
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
        layers: [props.coreLayer],
      }
    );

    const roomRemovedLambdaFn = new RoomRemovedSubscriber(
      this,
      "RoomRemovedSubscriber",
      {
        connectionTable: props.connectionTable,
        roomWebsocketApiPostArn: props.roomWebsocketApiPostArn,
        roomWebsocketApiDeleteArn: props.roomWebsocketApiDeleteArn,
        roomSocketApiEndpoint: props.roomSocketApiEndpoint,
        externalEventBus: props.externalEventBus,
        externalEventBusEventSourceName: props.externalEventBusEventSourceName,
        layers: [props.coreLayer],
      }
    );

    const userJoinedLambdaFn = new UserJoinedSubscriber(
      this,
      "UserJoinedSubscriber",
      {
        table: props.table,
        connectionTable: props.connectionTable,
        roomWebsocketApiPostArn: props.roomWebsocketApiPostArn,
        roomSocketApiEndpoint: props.roomSocketApiEndpoint,
        externalEventBus: props.externalEventBus,
        externalEventBusEventSourceName: props.externalEventBusEventSourceName,
        layers: [props.coreLayer],
      }
    );

    const userLeftLambdaFn = new UserLeftSubscriber(
      this,
      "UserLeftSubscriber",
      {
        table: props.table,
        connectionTable: props.connectionTable,
        roomWebsocketApiPostArn: props.roomWebsocketApiPostArn,
        roomSocketApiEndpoint: props.roomSocketApiEndpoint,
        roomWebsocketApiDeleteArn: props.roomWebsocketApiDeleteArn,
        externalEventBus: props.externalEventBus,
        externalEventBusEventSourceName: props.externalEventBusEventSourceName,
        layers: [props.coreLayer],
      }
    );

    const hostChangeLambdaFn = new HostChangedSubscriber(
      this,
      "HostChangedSubscriber",
      {
        connectionTable: props.connectionTable,
        roomWebsocketApiPostArn: props.roomWebsocketApiPostArn,
        roomSocketApiEndpoint: props.roomSocketApiEndpoint,
        externalEventBus: props.externalEventBus,
        externalEventBusEventSourceName: props.externalEventBusEventSourceName,
        layers: [props.coreLayer],
      }
    );

    const gameInitializedLambdaFn = new GameInitializedSubscriber(
      this,
      "GameInitializedSubscriber",
      {
        table: props.table,
        connectionTable: props.connectionTable,
        roomWebsocketApiPostArn: props.roomWebsocketApiPostArn,
        roomSocketApiEndpoint: props.roomSocketApiEndpoint,
        layers: [props.coreLayer],
      }
    );

    const gameStartedLambdaFn = new GameStartedSubscriber(
      this,
      "GameStartedSubscriber",
      {
        table: props.table,
        connectionTable: props.connectionTable,
        roomWebsocketApiPostArn: props.roomWebsocketApiPostArn,
        roomSocketApiEndpoint: props.roomSocketApiEndpoint,
        layers: [props.coreLayer],
      }
    );

    const gameCompletedLambdaFn = new GameCompletedSubscriber(
      this,
      "GameCompletedSubscriber",
      {
        table: props.table,
        connectionTable: props.connectionTable,
        roomWebsocketApiPostArn: props.roomWebsocketApiPostArn,
        roomSocketApiEndpoint: props.roomSocketApiEndpoint,
        layers: [props.coreLayer],
      }
    );

    const gameMessageLambdaFn = new GameMessageSubscriber(
      this,
      "GameMessageSubscriber",
      {
        table: props.table,
        connectionTable: props.connectionTable,
        roomWebsocketApiPostArn: props.roomWebsocketApiPostArn,
        roomSocketApiEndpoint: props.roomSocketApiEndpoint,
        layers: [props.coreLayer],
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

    new Rule(this, "HostChangedSubscriberRule", {
      description:
        "Rule that subscribes to host being changed for a given room.",
      targets: [
        new aws_events_targets.LambdaFunction(
          hostChangeLambdaFn.lambdaFunction
        ),
      ],
      eventPattern: {
        source: [props.eventBusSourceName],
        detailType: [EventTypes.changeHost],
      },
      eventBus: props.eventBus,
    });

    new Rule(this, "GameInitializedSubscriberRule", {
      description: "Rule that subscribes to game initializations from games.",
      targets: [
        new aws_events_targets.LambdaFunction(
          gameInitializedLambdaFn.lambdaFunction
        ),
      ],
      eventPattern: {
        source: [props.roomReceiveEventBusSourceName],
        detailType: [EventTypes.gameInitialization],
      },
      eventBus: props.roomReceiveEventBus,
    });

    new Rule(this, "GameStartedSubscriberRule", {
      description: "Rule that subscribes to game starts.",
      targets: [
        new aws_events_targets.LambdaFunction(
          gameStartedLambdaFn.lambdaFunction
        ),
      ],
      eventPattern: {
        source: [props.roomReceiveEventBusSourceName],
        detailType: [EventTypes.gameStarted],
      },
      eventBus: props.roomReceiveEventBus,
    });

    new Rule(this, "GameCompletedSubscriberRule", {
      description: "Rule that subscribes to game completes.",
      targets: [
        new aws_events_targets.LambdaFunction(
          gameCompletedLambdaFn.lambdaFunction
        ),
      ],
      eventPattern: {
        source: [props.roomReceiveEventBusSourceName],
        detailType: [EventTypes.gameCompleted],
      },
      eventBus: props.roomReceiveEventBus,
    });

    new Rule(this, "GameMessageSubscriberRule", {
      description: "Rule that subscribes to game messages.",
      targets: [
        new aws_events_targets.LambdaFunction(
          gameMessageLambdaFn.lambdaFunction
        ),
      ],
      eventPattern: {
        source: [props.roomReceiveEventBusSourceName],
        detailType: [EventTypes.gameMessage],
      },
      eventBus: props.roomReceiveEventBus,
    });
  }
}
