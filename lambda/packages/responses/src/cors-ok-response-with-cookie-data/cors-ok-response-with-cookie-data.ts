import { APIGatewayProxyResult } from "aws-lambda";
import {
  CORS_ALLOWED_ORIGINS,
  COOKIE_DOMAIN,
  COOKIE_NAME,
} from "@oigamez/configuration";

export const corsOkResponseWithCookieData = <T>(
  responseData: T,
  cookieData: string
): APIGatewayProxyResult => {
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": CORS_ALLOWED_ORIGINS,
      "Set-Cookie": `${COOKIE_NAME}=${cookieData}; Domain=${COOKIE_DOMAIN}; HttpOnly; Secure;`,
    },
    body: JSON.stringify(responseData),
  };
};
