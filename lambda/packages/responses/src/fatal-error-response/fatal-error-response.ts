import { APIGatewayProxyResult } from "aws-lambda";

export const fatalErrorResponse = (error: string): APIGatewayProxyResult => {
  return {
    statusCode: 500,
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      errorMessages: [error],
    }),
  };
};
