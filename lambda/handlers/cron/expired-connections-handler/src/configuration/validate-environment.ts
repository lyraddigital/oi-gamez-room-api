import {
  verifyDynamoConnectionTableName,
  verifyDynamoLastDisconnectedIndexName,
  verifyDynamoTableName,
} from "@oigamez/configuration";
import { verifyExpiredDisconnectionWindowInSeconds } from "lambda/packages/configuration/src/expired-disconnection-window-in-seconds/verify-expired-disconnection-window-in-seconds";

export const validateEnvironment = (): void => {
  verifyDynamoTableName();
  verifyDynamoLastDisconnectedIndexName();
  verifyDynamoConnectionTableName();
  verifyExpiredDisconnectionWindowInSeconds();
};
