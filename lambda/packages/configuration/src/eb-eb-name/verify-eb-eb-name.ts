import { EB_EB_NAME } from "./eb-eb-name";

export const verifyEbName = (): void => {
  if (!EB_EB_NAME) {
    throw new Error("EB_EB_NAME environment variable is not set");
  }
};
