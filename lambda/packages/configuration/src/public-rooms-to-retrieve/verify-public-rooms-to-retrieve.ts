import { PUBLIC_ROOMS_TO_RETRIEVE } from "./public-rooms-to-retrieve";

export const verifyPublicRoomsToRetrieve = (): void => {
  if (!PUBLIC_ROOMS_TO_RETRIEVE) {
    throw new Error("PUBLIC_ROOMS_TO_RETRIEVE environment variable is not set");
  }
};
