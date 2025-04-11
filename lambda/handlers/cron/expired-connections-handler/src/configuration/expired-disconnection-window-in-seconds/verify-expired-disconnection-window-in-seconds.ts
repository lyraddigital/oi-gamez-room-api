import { EXPIRED_DISCONNECTION_WINDOW_IN_SECONDS } from "./expired-disconnection-window-in-seconds.js";

export const verifyExpiredDisconnectionWindowInSeconds = (): void => {
  if (isNaN(EXPIRED_DISCONNECTION_WINDOW_IN_SECONDS)) {
    throw new Error(`EXPIRED_DISCONNECTION_WINDOW_IN_SECONDS environment variable is not set, 
            or not set correctly. Make sure it's set as a positive integer.`);
  }
};
