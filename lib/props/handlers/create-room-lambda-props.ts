import { CorsProps } from "../cors-props.js";

import { LambdaHandlerProps } from "./lambda-handler-props.js";

export interface CreateRoomLambdaProps extends CorsProps, LambdaHandlerProps {
  hostRoomIndexName: string;
  jwtSecretKey: string;
  encryptionKey: string;
  encryptionIV: string;
  connectWindowInSeconds: number;
  jwtExpiryInMinutes: number;
}
