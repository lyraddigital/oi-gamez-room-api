import { CorsProps } from "../cors-props";
import { LambdaHandlerProps } from "./lambda-handler-props";

export interface GetPublicRoomsLambdaProps
  extends LambdaHandlerProps,
    CorsProps {
  visibleRoomsIndexName: string;
  numberOfPublicRoomsToRetrieve: number;
}
