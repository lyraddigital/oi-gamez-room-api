import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import {
  badRequestResponse,
  extractFromQueryString,
  fatalErrorResponse,
  okResponse,
} from "/opt/nodejs/oigamez-http";
import { validateEnvironment } from "./configuration";
import { verifyRequestData, processRoomConnection } from "./services";

validateEnvironment();

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const username = extractFromQueryString(event, "username");
    const roomCode = extractFromQueryString(event, "roomCode");
    const connectionId = event.requestContext.connectionId;
    const epochTime = event.requestContext.requestTimeEpoch;
    const ValidationResult = await verifyRequestData(
      username,
      roomCode,
      epochTime
    );

    if (!ValidationResult.isSuccessful) {
      return badRequestResponse(ValidationResult.errorMessages);
    }

    const { isHost, room, ttl } = ValidationResult.data!;

    await processRoomConnection(room, isHost, username!, connectionId!, ttl);

    return okResponse();
  } catch (e) {
    console.log(e);

    return fatalErrorResponse(
      "Unknown issue while trying to connect the user to the room."
    );
  }
};
