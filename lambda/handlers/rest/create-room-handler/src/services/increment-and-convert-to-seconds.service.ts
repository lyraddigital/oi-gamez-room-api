import { convertFromMillisecondsToSeconds } from "/opt/nodejs/oigamez-services.js";

export const incrementAndReturnInSeconds = (
  ttlInMilliseconds: number,
  incrementInSeconds: number
): number => {
  return (
    convertFromMillisecondsToSeconds(ttlInMilliseconds) + incrementInSeconds
  );
};
