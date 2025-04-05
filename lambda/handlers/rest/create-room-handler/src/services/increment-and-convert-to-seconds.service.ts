import { convertFromMillisecondsToSeconds } from "/opt/nodejs/oigamez-services";

export const incrementAndReturnInSeconds = (
  ttlInMilliseconds: number,
  incrementInSeconds: number
): number => {
  return (
    convertFromMillisecondsToSeconds(ttlInMilliseconds) + incrementInSeconds
  );
};
