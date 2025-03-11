import { VerificationResult } from "@oigamez/models";

import { validateRequest } from "../validators";

export const verifyRequestData = (
  origin: string | undefined,
  roomCode: string | undefined
): VerificationResult => {
  return validateRequest(origin, roomCode);
};
