import { APIGatewayProxyResult } from "aws-lambda";

export const okResponse = (statusCode: number = 200): APIGatewayProxyResult => {
  return {
    statusCode: statusCode,
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({}),
  };
};
