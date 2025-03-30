import { convertFromMillisecondsToSeconds } from "../../../../../packages/services/src/milliseconds-to-seconds";

export const incrementAndReturnInSeconds = (
  ttlInMilliseconds: number,
  incrementInSeconds: number
): number => {
  return (
    convertFromMillisecondsToSeconds(ttlInMilliseconds) + incrementInSeconds
  );
};
