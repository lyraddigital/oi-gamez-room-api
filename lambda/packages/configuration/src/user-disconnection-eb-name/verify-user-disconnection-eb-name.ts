import { USER_DISCONNECTION_EB_NAME } from "./user-disconnection-eb-name";

export const verifyUserDisconnectionEventBusName = (): void => {
  if (!USER_DISCONNECTION_EB_NAME) {
    throw new Error(
      "USER_DISCONNECTION_EB_NAME environment variable is not set"
    );
  }
};
