import { verifyDynamoConnectionTableName } from "/opt/nodejs/oigamez-core.js";
import { verifyDynamoConnectionIndexName } from "./dynamo-connection-index-name/index.js";

jest.mock("/opt/nodejs/oigamez-core.js");
jest.mock("./dynamo-connection-index-name");

import { validateEnvironment } from "./validate-environment.js";

describe("validateEnvironment for room disconnection tests", () => {
  test("correct verify mocks were called", () => {
    // Arrange / Action
    validateEnvironment();

    // Assert
    expect(verifyDynamoConnectionIndexName).toHaveBeenCalled();
    expect(verifyDynamoConnectionTableName).toHaveBeenCalled();
  });
});
