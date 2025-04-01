import { APIGatewayProxyResult } from "aws-lambda";

export const badRequestResponse = (
  errorMessages: string[]
): APIGatewayProxyResult => {
  return {
    statusCode: 400,
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ errorMessages }),
  };
};
