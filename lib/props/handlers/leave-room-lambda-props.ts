import { TableV2 } from "aws-cdk-lib/aws-dynamodb";
import { IEventBus } from "aws-cdk-lib/aws-events";

import { CorsProps } from "../cors-props.js";
import { LambdaHandlerProps } from "./lambda-handler-props.js";

export interface LeaveRoomLambdaProps extends CorsProps, LambdaHandlerProps {
  connectionTable: TableV2;
  eventBus: IEventBus;
  eventBusEventSourceName: string;
}
