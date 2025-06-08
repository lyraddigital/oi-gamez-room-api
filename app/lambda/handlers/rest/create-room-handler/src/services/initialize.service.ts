import { JWT_SECRET_KEY } from "@oigamez/core";
import { initialize } from "@oigamez/security";

export const initializeLambda = () => {
  initialize(JWT_SECRET_KEY);
};
