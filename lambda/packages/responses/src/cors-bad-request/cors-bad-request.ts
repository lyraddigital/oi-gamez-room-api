import { CORS_ALLOWED_ORIGINS } from "/opt/nodejs/oigamez-core";
import { APIGatewayProxyResult } from "aws-lambda";

export const corsBadRequestResponse = (
  errorMessages: string[]
): APIGatewayProxyResult => {
  return {
    statusCode: 400,
    headers: {
      "access-control-allow-origin": CORS_ALLOWED_ORIGINS,
      "content-type": "application/json",
    },
    body: JSON.stringify({ errorMessages }),
  };
};
