import { ApiGatewayManagementApiClient } from "@aws-sdk/client-apigatewaymanagementapi";

import { ROOM_SOCKET_API_ENDPOINT } from "/opt/nodejs/oigamez-core";

export const client = new ApiGatewayManagementApiClient({
  endpoint: ROOM_SOCKET_API_ENDPOINT,
});
