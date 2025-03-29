import {
  verifyCorsAllowedOrigin,
  verifyDynamoConnectionTableName,
  verifyDynamoTableName,
  verifyEncryptionIV,
  verifyEncryptionKey,
  verifyJwtExpiryInMinutes,
  verifyJwtSecretKey,
} from "@oigamez/configuration";

import { validateEnvironment } from "./validate-environment";

jest.mock("@oigamez/configuration");

describe("validateEnvironment for join room handler tests", () => {
  test("correct verify mocks were called", () => {
    // Arrange / Action
    validateEnvironment();

    // Assert
    expect(verifyCorsAllowedOrigin).toHaveBeenCalled();
    expect(verifyDynamoConnectionTableName).toHaveBeenCalled();
    expect(verifyDynamoTableName).toHaveBeenCalled();
    expect(verifyEncryptionKey).toHaveBeenCalled();
    expect(verifyEncryptionIV).toHaveBeenCalled();
    expect(verifyJwtExpiryInMinutes).toHaveBeenCalled();
    expect(verifyJwtSecretKey).toHaveBeenCalled();
  });
});
