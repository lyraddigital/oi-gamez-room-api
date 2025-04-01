import { APIGatewayProxyEvent } from "aws-lambda";

export const extractHeader = (
  event: APIGatewayProxyEvent | undefined,
  headerKey: string
): string | undefined => {
  return event?.headers ? event.headers[headerKey] : undefined;
};
