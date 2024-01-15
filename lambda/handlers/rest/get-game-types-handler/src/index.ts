import { APIGatewayProxyResult } from "aws-lambda";

import { corsOkResponseWithData, fatalErrorResponse } from "@oigamez/responses";

import { getAllGameTypes } from "@oigamez/repositories";

import { validateEnvironment } from "./configuration";

validateEnvironment();

export const handler = async (): Promise<APIGatewayProxyResult> => {
  try {
    return corsOkResponseWithData(await getAllGameTypes());
  } catch (e) {
    console.log(e);

    return fatalErrorResponse(
      "Unknown issue while trying to get all the game types."
    );
  }
};
