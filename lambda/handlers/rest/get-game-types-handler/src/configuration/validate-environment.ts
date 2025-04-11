import {
  verifyCorsAllowedOrigin,
  verifyDynamoTableName,
} from "/opt/nodejs/oigamez-core.js";

export const validateEnvironment = (): void => {
  verifyCorsAllowedOrigin();
  verifyDynamoTableName();
};
