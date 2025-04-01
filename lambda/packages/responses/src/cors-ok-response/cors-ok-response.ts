import { CORS_ALLOWED_ORIGINS } from "/opt/nodejs/oigamez-core";
import { APIGatewayProxyResult } from "aws-lambda";

export const corsOkResponse = (
  statusCode: number = 200
): APIGatewayProxyResult => {
  return {
    statusCode: statusCode,
    headers: {
      "access-control-allow-origin": CORS_ALLOWED_ORIGINS,
      "content-type": "application/json",
    },
    body: JSON.stringify({}),
  };
};
