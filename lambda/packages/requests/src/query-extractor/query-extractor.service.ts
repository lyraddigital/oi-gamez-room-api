import { APIGatewayEvent } from "aws-lambda";

export const extractFromQueryString = (
  event: APIGatewayEvent | undefined,
  queryKey: string
) => {
  return event?.queryStringParameters
    ? event.queryStringParameters[queryKey]
    : undefined;
};
