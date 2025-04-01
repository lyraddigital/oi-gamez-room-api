import { APIGatewayProxyResult } from "aws-lambda";

import { corsOkResponseWithData, fatalErrorResponse } from "@oigamez/responses";

import { CORS_ALLOWED_ORIGINS } from "/opt/nodejs/oigamez-core";
import { validateEnvironment } from "./configuration";
import { getAllGameTypes } from "./repositories";

validateEnvironment();

export const handler = async (): Promise<APIGatewayProxyResult> => {
  try {
    return corsOkResponseWithData(
      CORS_ALLOWED_ORIGINS,
      await getAllGameTypes()
    );
  } catch (e) {
    console.log(e);

    return fatalErrorResponse(
      "Unknown issue while trying to get all the game types."
    );
  }
};
