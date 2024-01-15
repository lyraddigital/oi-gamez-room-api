import { APIGatewayProxyResult } from "aws-lambda";
import {
  CORS_ALLOWED_ORIGINS,
  COOKIE_DOMAIN,
  COOKIE_NAME,
} from "@oigamez/configuration";

export const corsOkResponseWithExpiredCookie = <T>(
  statusCode: number,
  responseData: T
): APIGatewayProxyResult => {
  return {
    statusCode: statusCode,
    headers: {
      "Access-Control-Allow-Origin": CORS_ALLOWED_ORIGINS,
      "Set-Cookie": `${COOKIE_NAME}=; Domain=${COOKIE_DOMAIN}; HttpOnly; Secure; Max-Age=-1`,
    },
    body: JSON.stringify(responseData),
  };
};
