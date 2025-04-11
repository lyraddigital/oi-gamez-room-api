import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import { CORS_ALLOWED_ORIGINS } from "@oigamez/core";
import {
  corsBadRequestResponse,
  corsOkResponse,
  fatalErrorResponse,
  extractFromPath,
  extractHeader,
  parseBody,
} from "/opt/nodejs/oigamez-http.js";

import { validateEnvironment } from "./configuration/index.js";
import { LeaveRoomPayload } from "./models/index.js";
import { processLeavingRoom, verifyRequestData } from "./services/index.js";

validateEnvironment();

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const origin = extractHeader(event, "Origin");
    const requestTimeEpoch = event.requestContext.requestTimeEpoch;
    const roomCode = extractFromPath(event, "roomCode");
    const payload = parseBody<LeaveRoomPayload>(event);
    const ValidationResult = await verifyRequestData(
      origin,
      roomCode,
      payload,
      requestTimeEpoch
    );

    if (!ValidationResult.isSuccessful) {
      return corsBadRequestResponse(
        CORS_ALLOWED_ORIGINS,
        ValidationResult.errorMessages
      );
    }

    const [room, connections] = ValidationResult.data!;

    await processLeavingRoom(room, connections, payload!);

    return corsOkResponse(CORS_ALLOWED_ORIGINS, 204);
  } catch (e) {
    console.log(e);

    return fatalErrorResponse(
      "Unexpected error occurred while trying to leave the room."
    );
  }
};
