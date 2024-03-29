import { CorsProps } from "../cors-props";

import { LambdaHandlerProps } from "./lambda-handler-props";

export interface CreateRoomLambdaProps extends CorsProps, LambdaHandlerProps {
  hostRoomIndexName: string;
  connectWindowInSeconds: number;
}
