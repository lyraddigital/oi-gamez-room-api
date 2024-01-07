import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import {
  badRequestResponse,
  okResponse,
  fatalErrorResponse,
} from "@oigamez/responses";

import { validateEnvironment } from "./configuration";
import { validateRequest } from "./validators";

validateEnvironment();

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const username = event?.queryStringParameters
      ? event.queryStringParameters["username"]
      : undefined;

    const roomCode = event?.queryStringParameters
      ? event.queryStringParameters["roomCode"]
      : undefined;

    const validationResult = validateRequest(username, roomCode);

    if (!validationResult.isSuccessful) {
      return badRequestResponse(validationResult.errorMessages);
    }

    return okResponse();
  } catch (e) {
    console.log(e);

    return fatalErrorResponse(
      "Unknown issue while trying to connect the user to the game."
    );
  }
};
