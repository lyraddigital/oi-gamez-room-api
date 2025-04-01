import { ENCRYPTION_IV } from "./encryption-iv";

export const verifyEncryptionIV = (): void => {
  if (!ENCRYPTION_IV) {
    throw new Error("ENCRYPTION_IV environment variable is not set");
  }
};
