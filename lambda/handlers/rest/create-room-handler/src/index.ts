import { APIGatewayProxyResult } from "aws-lambda";

import { corsOkResponseWithData, fatalErrorResponse } from "@oigamez/responses";

import { validateEnvironment } from "./configuration";
import {
  getAllUnavailableDivisionAndGroupCodes,
  getUniqueRoomCode,
} from "./repositories";
import {
  getAnAvailableDivisionAndGroupCode,
  handleErrorResponse,
} from "./services";

validateEnvironment();

export const handler = async (): Promise<APIGatewayProxyResult> => {
  try {
    const unavailableDivisionAndGroupCodes =
      await getAllUnavailableDivisionAndGroupCodes();
    const [divisionCode, groupCode] = getAnAvailableDivisionAndGroupCode(
      unavailableDivisionAndGroupCodes
    );
    const [roomCode, isRoomCodeGroupExhaused] = await getUniqueRoomCode(
      divisionCode,
      groupCode
    );

    // await createRoom(
    //   {
    //     gameTypeId: 1,
    //     code: "AAAA",
    //     hostUsername: "daryl_duck",
    //     name: "Some Room",
    //     minNumberOfPlayers: 2,
    //     maxNumberOfPlayers: 2,
    //     ttl: 449959595,
    //   },
    //   isRoomCodeGroupExhaused
    // );

    return corsOkResponseWithData({ roomCode, isRoomCodeGroupExhaused });
  } catch (e) {
    console.log(e);

    return fatalErrorResponse(handleErrorResponse(e));
  }
};
