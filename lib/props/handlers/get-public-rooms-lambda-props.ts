import { CorsProps } from "../cors-props.js";
import { LambdaHandlerProps } from "./lambda-handler-props.js";

export interface GetPublicRoomsLambdaProps
  extends LambdaHandlerProps,
    CorsProps {
  visibleRoomsIndexName: string;
  numberOfPublicRoomsToRetrieve: number;
}
