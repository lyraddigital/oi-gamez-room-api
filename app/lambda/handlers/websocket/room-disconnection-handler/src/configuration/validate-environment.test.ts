import { verifyDynamoConnectionTableName } from "@oigamez/core";
import { verifyDynamoConnectionIndexName } from "./dynamo-connection-index-name";

jest.mock("@oigamez/core");
jest.mock("./dynamo-connection-index-name");

import { validateEnvironment } from "./validate-environment";

describe("validateEnvironment for room disconnection tests", () => {
  test("correct verify mocks were called", () => {
    // Arrange / Action
    validateEnvironment();

    // Assert
    expect(verifyDynamoConnectionIndexName).toHaveBeenCalled();
    expect(verifyDynamoConnectionTableName).toHaveBeenCalled();
  });
});
