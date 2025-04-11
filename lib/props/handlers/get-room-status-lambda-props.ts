import { CorsProps } from "../cors-props.js";

import { LambdaHandlerProps } from "./lambda-handler-props.js";

export interface GetRoomStatusLambdaProps
  extends CorsProps,
    LambdaHandlerProps {}
