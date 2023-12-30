import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  return await Promise.resolve<APIGatewayProxyResult>({
    statusCode: 200,
    headers: {
      "access-control-allow-origin": "http://localhost:3000",
      "content-type": "application/json",
    },
    body: JSON.stringify({}),
  });
};
