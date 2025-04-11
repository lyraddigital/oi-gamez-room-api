import { JWT_SECRET_KEY } from "@oigamez/core";
import { sign } from "jsonwebtoken";

export const generateAccessToken = <T extends object>(
  payload: T,
  expiryInMinutes: number
): string => {
  return sign(payload, JWT_SECRET_KEY, {
    expiresIn: `${expiryInMinutes} minutes`,
  });
};
