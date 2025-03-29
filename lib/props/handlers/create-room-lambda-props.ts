import { CorsProps } from "../cors-props";

import { LambdaHandlerProps } from "./lambda-handler-props";

export interface CreateRoomLambdaProps extends CorsProps, LambdaHandlerProps {
  hostRoomIndexName: string;
  jwtSecretKey: string;
  encryptionKey: string;
  encryptionIV: string;
  connectWindowInSeconds: number;
  jwtExpiryInMinutes: number;
}
