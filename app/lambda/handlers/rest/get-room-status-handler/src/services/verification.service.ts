import { VerificationResult } from "@oigamez/http";

import { validateRequest } from "../validators";

export const verifyRequestData = (
  origin: string | undefined,
  roomCode: string | undefined
): VerificationResult => {
  return validateRequest(origin, roomCode);
};
