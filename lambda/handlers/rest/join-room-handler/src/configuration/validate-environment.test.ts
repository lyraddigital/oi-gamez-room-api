import {
  verifyCorsAllowedOrigin,
  verifyDynamoConnectionTableName,
  verifyDynamoTableName,
  verifyEncryptionIV,
  verifyEncryptionKey,
  verifyJwtExpiryInMinutes,
  verifyJwtSecretKey,
} from "/opt/nodejs/oigamez-core.js";

import { validateEnvironment } from "./validate-environment.js";

jest.mock("/opt/nodejs/oigamez-core.js");

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
