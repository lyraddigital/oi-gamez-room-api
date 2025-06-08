import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import {
  badRequestResponse,
  extractFromQueryString,
  fatalErrorResponse,
  okResponse,
} from "@oigamez/http";
import { validateEnvironment } from "./configuration";
import {
  verifyRequestData,
  processRoomConnection,
  initializeLambda,
} from "./services";

validateEnvironment();
initializeLambda();

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const username = extractFromQueryString(event, "username");
    const roomCode = extractFromQueryString(event, "roomCode");
    const connectionId = event.requestContext.connectionId;
    const epochTime = event.requestContext.requestTimeEpoch;
    const validationResult = await verifyRequestData(
      username,
      roomCode,
      epochTime
    );

    if (!validationResult.isSuccessful) {
      return badRequestResponse(validationResult.errorMessages);
    }

    const { isHost, room, ttl } = validationResult.data!;

    await processRoomConnection(room, isHost, username!, connectionId!, ttl);

    return okResponse();
  } catch (e) {
    console.log(e);

    return fatalErrorResponse(
      "Unknown issue while trying to connect the user to the room."
    );
  }
};
