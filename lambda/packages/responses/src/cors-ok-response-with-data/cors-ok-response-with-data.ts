import { CORS_ALLOWED_ORIGINS } from "/opt/nodejs/oigamez-core";
import { APIGatewayProxyResult } from "aws-lambda";

export const corsOkResponseWithData = <T>(data: T): APIGatewayProxyResult => {
  return {
    statusCode: 200,
    headers: {
      "access-control-allow-origin": CORS_ALLOWED_ORIGINS,
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  };
};
