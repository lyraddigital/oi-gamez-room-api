import { Construct } from "constructs";

import { HandlerFilePaths, HandlerFunctionNames } from "../../constants";
import { GetPublicRoomsLambdaProps } from "../../props";

import { RestAPIHandlerFunction } from "./rest-api-handler-function";

export class GetPublicRoomsLambda extends Construct {
  constructor(scope: Construct, id: string, props: GetPublicRoomsLambdaProps) {
    super(scope, id);

    const getGameTypesLambda = new RestAPIHandlerFunction(this, "RestAPI", {
      handlerFileLocation: HandlerFilePaths.getPublicRooms,
      handlerFunctionName: HandlerFunctionNames.getPublicRooms,
      method: "GET",
      resource: props.resource,
      environment: {},
    });
  }
}
