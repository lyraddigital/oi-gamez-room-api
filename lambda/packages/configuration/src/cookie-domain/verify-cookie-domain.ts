import { COOKIE_DOMAIN } from "./cookie-domain";

export const verifyCookieDomain = (): void => {
  if (!COOKIE_DOMAIN) {
    throw new Error("COOKIE_DOMAIN environment variable is not set");
  }
};
