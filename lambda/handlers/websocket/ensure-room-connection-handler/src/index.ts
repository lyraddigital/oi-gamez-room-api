import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import { extractFromQueryString } from "@oigamez/requests";
import {
  badRequestResponse,
  fatalErrorResponse,
  okResponse,
} from "@oigamez/responses";

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
    const verificationResult = await verifyRequestData(
      username,
      roomCode,
      epochTime
    );

    if (!verificationResult.isSuccessful) {
      return badRequestResponse(verificationResult.errorMessages);
    }

    const { isHost, room, ttl } = verificationResult.data!;

    await processRoomConnection(room, isHost, username!, connectionId!, ttl);

    return okResponse();
  } catch (e) {
    console.log(e);

    return fatalErrorResponse(
      "Unknown issue while trying to connect the user to the room."
    );
  }
};
