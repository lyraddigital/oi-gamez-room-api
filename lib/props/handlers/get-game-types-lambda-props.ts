import { CorsProps } from "../cors-props.js";

import { LambdaHandlerProps } from "./lambda-handler-props.js";

export interface GetGameTypesLambdaProps
  extends CorsProps,
    LambdaHandlerProps {}
