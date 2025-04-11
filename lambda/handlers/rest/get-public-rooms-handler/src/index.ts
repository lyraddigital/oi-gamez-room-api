import { APIGatewayProxyResult } from "aws-lambda";

import { CORS_ALLOWED_ORIGINS } from "@oigamez/core";
import {
  corsOkResponseWithData,
  fatalErrorResponse,
} from "/opt/nodejs/oigamez-http.js";

import { validateEnvironment } from "./configuration/index.js";
import { getPublicRooms } from "./repositories/index.js";

validateEnvironment();

export const handler = async (): Promise<APIGatewayProxyResult> => {
  try {
    const publicRooms = await getPublicRooms();

    return corsOkResponseWithData(CORS_ALLOWED_ORIGINS, publicRooms);
  } catch (e) {
    console.log(e);

    return fatalErrorResponse(
      "Unknown issue while trying to get the public rooms to join"
    );
  }
};
