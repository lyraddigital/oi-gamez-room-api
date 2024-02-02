import { TableV2 } from "aws-cdk-lib/aws-dynamodb";

import { CorsProps } from "../cors-props";
import { LambdaHandlerProps } from "./lambda-handler-props";
import { IEventBus } from "aws-cdk-lib/aws-events";

export interface LeaveRoomLambdaProps extends CorsProps, LambdaHandlerProps {
  connectionTable: TableV2;
  eventBus: IEventBus;
  eventBusEventSourceName: string;
}
