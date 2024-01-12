import {
  verifyCookieDomain,
  verifyCookieName,
  verifyCorsAllowedOrigin,
  verifyDynamoTableName,
} from "@oigamez/configuration";

export const validateEnvironment = (): void => {
  verifyCorsAllowedOrigin();
  verifyDynamoTableName();
  verifyCookieName();
  verifyCookieDomain();
};
