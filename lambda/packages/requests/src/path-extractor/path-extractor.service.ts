import { APIGatewayEvent } from "aws-lambda";

export const extractFromPath = (
  event: APIGatewayEvent | undefined,
  pathKey: string
) => {
  return event?.pathParameters ? event.pathParameters[pathKey] : undefined;
};
