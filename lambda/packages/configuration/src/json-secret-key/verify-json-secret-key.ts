import { JWT_SECRET_KEY } from "./json-secret-key";

export const verifyJwtSecretKey = (): void => {
  if (!JWT_SECRET_KEY) {
    throw new Error("JWT_SECRET_KEY environment variable is not set");
  }
};
