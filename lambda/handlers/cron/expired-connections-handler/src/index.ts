import { EventBridgeEvent } from "aws-lambda";

import { convertFromMillisecondsToSeconds } from "@oigamez/services";

import { validateEnvironment } from "./configuration";

validateEnvironment();

export const handler = async (
  _: EventBridgeEvent<"Check Expired Connections", void>
): Promise<void> => {
  try {
    const currentTimeInSeconds = convertFromMillisecondsToSeconds(
      Math.floor(new Date().getTime())
    );

    // We will use the ttl to find connections where the last disconnected time is less
    // than the current time (stored in epoch seconds).
    // From this list we will fetch all users associated to those connections

    console.log("Current Epoch Seconds", currentTimeInSeconds);
  } catch (e) {
    console.log(e);
  }
};
