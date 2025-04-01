import { EB_INTERNAL_EB_NAME } from "./eb-internal-eb-name";

export const verifyEbName = (): void => {
  if (!EB_INTERNAL_EB_NAME) {
    throw new Error("EB_INTERNAL_EB_NAME environment variable is not set");
  }
};
