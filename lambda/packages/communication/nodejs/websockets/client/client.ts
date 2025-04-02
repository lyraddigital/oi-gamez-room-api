import { ApiGatewayManagementApiClient } from "@aws-sdk/client-apigatewaymanagementapi";

let client: ApiGatewayManagementApiClient;

export const initialize = (roomSocketApiEndpoint: string) => {
  client = new ApiGatewayManagementApiClient({
    endpoint: roomSocketApiEndpoint,
  });
};

export const getClient = (): ApiGatewayManagementApiClient => {
  return client;
};
