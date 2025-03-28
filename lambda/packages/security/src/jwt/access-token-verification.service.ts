import { JWT_SECRET_KEY } from "@oigamez/configuration";
import { verify } from "jsonwebtoken";

export const verifyAccessToken = <T extends object>(accessToken: string): T => {
  return verify(accessToken, JWT_SECRET_KEY) as T;
};
