import {
  verifyDynamoConnectionIndexName,
  verifyDynamoConnectionTableName,
} from "@oigamez/configuration";

jest.mock("@oigamez/configuration");

import { validateEnvironment } from "./validate-environment";

describe("validateEnvironment for room disconnection tests", () => {
  it("correct verify mocks were called", () => {
    // Arrange / Action
    validateEnvironment();

    // Assert
    expect(verifyDynamoConnectionIndexName).toHaveBeenCalled();
    expect(verifyDynamoConnectionTableName).toHaveBeenCalled();
  });
});
