import {
  verifyCookieDomain,
  verifyCookieName,
  verifyCorsAllowedOrigin,
  verifyDynamoHostRoomIndexName,
  verifyDynamoTableName,
} from "@oigamez/configuration";

export const validateEnvironment = (): void => {
  verifyCorsAllowedOrigin();
  verifyDynamoTableName();
  verifyDynamoHostRoomIndexName();
  verifyCookieName();
  verifyCookieDomain();
};
