import { RestApi } from "aws-cdk-lib/aws-apigateway";
import { Construct } from "constructs";

import { ResourcePaths } from "../constants";
import { RoomsRestApiProps } from "../props";

import {
  CreateRoomLambda,
  GetGameTypesLambda,
  GetPublicRoomsLambda,
  GetRoomStatusLambda,
  JoinRoomLambda,
  LeaveRoomLambda,
} from "./handlers";

export class RoomsRestApi extends Construct {
  constructor(scope: Construct, id: string, props: RoomsRestApiProps) {
    super(scope, id);

    const api = new RestApi(scope, "RoomsRestApi", {
      description:
        "HTTP API that will keep track of all room related data for all puzzle games on the OI Gamez website",
    });

    const gameTypesResource = api.root.addResource(ResourcePaths.gameTypes);
    const roomsResource = api.root.addResource(ResourcePaths.rooms);
    const publicRoomsResource = roomsResource.addResource(ResourcePaths.public);
    const roomResource = roomsResource.addResource(ResourcePaths.room);

    new GetGameTypesLambda(this, "GetGameTypesLambda", {
      table: props.table,
      resource: gameTypesResource,
      allowedOrigins: props.allowedOrigins,
    });

    new CreateRoomLambda(this, "CreateRoomLambda", {
      table: props.table,
      resource: roomsResource,
      allowedOrigins: props.allowedOrigins,
      connectWindowInSeconds: props.connectWindowInSeconds,
      hostRoomIndexName: props.hostRoomIndexName,
      jwtSecretKey: props.jwtSecretKey,
      jwtExpiryInMinutes: props.jwtExpiryInMinutes,
    });

    new GetPublicRoomsLambda(this, "GetPublicRoomsLambda", {
      table: props.table,
      resource: publicRoomsResource,
      allowedOrigins: props.allowedOrigins,
      visibleRoomsIndexName: props.visibleRoomsIndexName,
      numberOfPublicRoomsToRetrieve: props.numberOfPublicRoomsToRetrieve,
    });

    new GetRoomStatusLambda(this, "GetRoomStatusLambda", {
      table: props.table,
      resource: roomResource,
      allowedOrigins: props.allowedOrigins,
    });

    new JoinRoomLambda(this, "JoinRoomLambda", {
      table: props.table,
      connectionTable: props.connectionTable,
      resource: roomResource,
      allowedOrigins: props.allowedOrigins,
    });

    new LeaveRoomLambda(this, "LeaveRoomLambda", {
      table: props.table,
      connectionTable: props.connectionTable,
      resource: roomResource,
      allowedOrigins: props.allowedOrigins,
      eventBus: props.eventBus,
      eventBusEventSourceName: props.eventBusSourceName,
    });
  }
}
