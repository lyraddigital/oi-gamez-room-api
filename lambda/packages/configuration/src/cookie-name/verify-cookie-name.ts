import { COOKIE_NAME } from "./cookie-name";

export const verifyCookieName = (): void => {
  if (!COOKIE_NAME) {
    throw new Error("COOKIE_NAME environment variable is not set");
  }
};
