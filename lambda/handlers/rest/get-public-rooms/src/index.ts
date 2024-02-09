import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import { corsOkResponseWithData, fatalErrorResponse } from "@oigamez/responses";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    return corsOkResponseWithData([]);
  } catch (e) {
    console.log(e);

    return fatalErrorResponse(
      "Unknown issue while trying to get the public rooms to join"
    );
  }
};
