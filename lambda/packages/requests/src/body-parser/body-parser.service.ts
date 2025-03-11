import { APIGatewayProxyEvent } from "aws-lambda";

export const parseBody = <T>(event?: APIGatewayProxyEvent): T | undefined => {
  if (event?.body) {
    try {
      return JSON.parse(event.body) as T;
    } catch {}
  }

  return undefined;
};
