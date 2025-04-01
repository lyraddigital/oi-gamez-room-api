import { APIGatewayProxyResult } from "aws-lambda";

export const corsOkResponse = (
  corsAllowedOrigins: string,
  statusCode: number = 200
): APIGatewayProxyResult => {
  return {
    statusCode: statusCode,
    headers: {
      "access-control-allow-origin": corsAllowedOrigins,
      "content-type": "application/json",
    },
    body: JSON.stringify({}),
  };
};
