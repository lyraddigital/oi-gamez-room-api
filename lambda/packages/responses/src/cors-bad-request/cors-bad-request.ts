import { APIGatewayProxyResult } from "aws-lambda";

export const corsBadRequestResponse = (
  corsAllowedOrigins: string,
  errorMessages: string[]
): APIGatewayProxyResult => {
  return {
    statusCode: 400,
    headers: {
      "access-control-allow-origin": corsAllowedOrigins,
      "content-type": "application/json",
    },
    body: JSON.stringify({ errorMessages }),
  };
};
