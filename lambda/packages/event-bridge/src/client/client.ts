import { EventBridgeClient } from "@aws-sdk/client-eventbridge";

export const client = new EventBridgeClient({
  region: "ap-southeast-2",
});
