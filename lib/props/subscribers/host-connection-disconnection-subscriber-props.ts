import { TableV2 } from "aws-cdk-lib/aws-dynamodb";
import { IEventBus } from "aws-cdk-lib/aws-events";

export interface HostConnectionDisconnectionSubscriberProps {
  eventBus: IEventBus;
  connectionTable: TableV2;
}
