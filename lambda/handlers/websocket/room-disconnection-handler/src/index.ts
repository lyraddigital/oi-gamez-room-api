import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import { okResponse } from "@oigamez/responses";
import { convertFromMillisecondsToSeconds } from "@oigamez/services";

import { validateEnvironment } from "./configuration";
import {
  getConnectionById,
  updateConnectionDisconnectionTime,
} from "./repositories";

validateEnvironment();

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const connectionId = event.requestContext.connectionId;
    const epochTime = event.requestContext.requestTimeEpoch;
    const ttl = convertFromMillisecondsToSeconds(epochTime);
    const connection = await getConnectionById(connectionId!, ttl);

    if (connection) {
      await updateConnectionDisconnectionTime(connection, ttl);
    }
  } catch (e) {
    console.log(e);
  }

  return okResponse();
};
