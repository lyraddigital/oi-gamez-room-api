import { EB_EXTERNAL_EB_NAME } from "./eb-external-eb-name.js";

export const verifyExternalEbName = (): void => {
  if (!EB_EXTERNAL_EB_NAME) {
    throw new Error("EB_EXTERNAL_EB_NAME environment variable is not set");
  }
};
