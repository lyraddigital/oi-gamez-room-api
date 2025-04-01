import { ENCRYPTION_KEY } from "./encryption-key";

export const verifyEncryptionKey = (): void => {
  if (!ENCRYPTION_KEY) {
    throw new Error("ENCRYPTION_KEY environment variable is not set");
  }

  if (ENCRYPTION_KEY.length !== 32) {
    throw new Error("ENCRYPTION_KEY environment variable must be 32 bytes");
  }
};
