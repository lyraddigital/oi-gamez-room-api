import { APIGatewayProxyResult } from "aws-lambda";

export const corsOkResponseWithData = <T>(
  corsAllowedOrigins: string,
  data: T
): APIGatewayProxyResult => {
  return {
    statusCode: 200,
    headers: {
      "access-control-allow-origin": corsAllowedOrigins,
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  };
};
