import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import {
  corsBadRequestResponse,
  corsOkResponse,
  fatalErrorResponse,
} from "@oigamez/responses";

import { CORS_ALLOWED_ORIGINS } from "/opt/nodejs/oigamez-core";
import {
  extractFromPath,
  extractHeader,
  parseBody,
} from "/opt/nodejs/oigamez-http";
import { validateEnvironment } from "./configuration";
import { LeaveRoomPayload } from "./models";
import { processLeavingRoom, verifyRequestData } from "./services";

validateEnvironment();

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const origin = extractHeader(event, "Origin");
    const requestTimeEpoch = event.requestContext.requestTimeEpoch;
    const roomCode = extractFromPath(event, "roomCode");
    const payload = parseBody<LeaveRoomPayload>(event);
    const verificationResult = await verifyRequestData(
      origin,
      roomCode,
      payload,
      requestTimeEpoch
    );

    if (!verificationResult.isSuccessful) {
      return corsBadRequestResponse(
        CORS_ALLOWED_ORIGINS,
        verificationResult.errorMessages
      );
    }

    const [room, connections] = verificationResult.data!;

    await processLeavingRoom(room, connections, payload!);

    return corsOkResponse(CORS_ALLOWED_ORIGINS, 204);
  } catch (e) {
    console.log(e);

    return fatalErrorResponse(
      "Unexpected error occurred while trying to leave the room."
    );
  }
};
