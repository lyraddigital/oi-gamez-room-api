import { TableV2 } from "aws-cdk-lib/aws-dynamodb";

import { CorsProps } from "../cors-props";
import { LambdaHandlerProps } from "./lambda-handler-props";

export interface LeaveRoomLambdaProps extends CorsProps, LambdaHandlerProps {
  connectionTable: TableV2;
  roomWebsocketEndpoint: string;
  roomWebsocketApiPostArn: string;
  roomWebsocketApiDeleteArn: string;
}
