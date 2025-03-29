import { TableV2 } from "aws-cdk-lib/aws-dynamodb";

import { CorsProps } from "../cors-props";
import { LambdaHandlerProps } from "./lambda-handler-props";

export interface JoinRoomLambdaProps extends CorsProps, LambdaHandlerProps {
  connectionTable: TableV2;
  encryptionKey: string;
  encryptionIV: string;
  jwtSecretKey: string;
  jwtExpiryInMinutes: number;
}
