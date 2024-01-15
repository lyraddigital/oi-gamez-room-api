import { CorsProps } from "../cors-props";

import { LambdaHandlerProps } from "./lambda-handler-props";

export interface GetRoomStatusLambdaProps
  extends CorsProps,
    LambdaHandlerProps {}
