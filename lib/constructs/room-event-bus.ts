import { EventBus, IEventBus } from "aws-cdk-lib/aws-events";
import { Construct } from "constructs";

export class RoomEventBus extends Construct {
  public eventBus: IEventBus;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.eventBus = new EventBus(this, "OIGamezRoomEventBus");
  }
}
