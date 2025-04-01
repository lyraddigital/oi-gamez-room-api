import { JWT_EXPIRY_IN_MINUTES } from "./jwt-expiry-in-minutes";

export const verifyJwtExpiryInMinutes = (): void => {
  if (isNaN(JWT_EXPIRY_IN_MINUTES)) {
    throw new Error(`JWT_EXPIRY_IN_MINUTES environment variable is not set, 
            or not set correctly. Make sure it's set as a positive integer.`);
  }
};
