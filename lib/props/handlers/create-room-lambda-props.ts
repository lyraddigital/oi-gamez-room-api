import { CorsProps } from "../cors-props";

import { LambdaHandlerProps } from "./lambda-handler-props";

export interface CreateRoomLambdaProps extends CorsProps, LambdaHandlerProps {
  sessionCookieDomain: string;
  sessionCookieName: string;
  hostRoomIndexName: string;
  connectWindowInSeconds: number;
}
