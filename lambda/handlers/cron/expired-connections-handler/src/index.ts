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

    console.log("Current Epoch Seconds", currentTimeInSeconds);
  } catch (e) {
    console.log(e);
  }
};
