import { PUBLIC_ROOMS_TO_RETRIEVE } from "./public-rooms-to-retrieve.js";

export const verifyPublicRoomsToRetrieve = (): void => {
  if (isNaN(PUBLIC_ROOMS_TO_RETRIEVE)) {
    throw new Error("PUBLIC_ROOMS_TO_RETRIEVE environment variable is not set");
  }
};
