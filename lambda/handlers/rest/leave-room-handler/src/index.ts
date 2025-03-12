import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import { extractFromPath, extractHeader, parseBody } from "@oigamez/requests";
import {
  corsBadRequestResponse,
  corsOkResponse,
  fatalErrorResponse,
} from "@oigamez/responses";

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
      return corsBadRequestResponse(verificationResult.errorMessages);
    }

    const [room, connections] = verificationResult.data!;

    await processLeavingRoom(room, connections, payload!);

    return corsOkResponse(204);
  } catch (e) {
    console.log(e);

    return fatalErrorResponse(
      "Unexpected error occurred while trying to leave the room."
    );
  }
};
