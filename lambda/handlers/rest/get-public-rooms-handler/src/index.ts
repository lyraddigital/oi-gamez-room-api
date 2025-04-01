import { APIGatewayProxyResult } from "aws-lambda";

import { corsOkResponseWithData, fatalErrorResponse } from "@oigamez/responses";

import { CORS_ALLOWED_ORIGINS } from "/opt/nodejs/oigamez-core";
import { validateEnvironment } from "./configuration";
import { getPublicRooms } from "./repositories";

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
