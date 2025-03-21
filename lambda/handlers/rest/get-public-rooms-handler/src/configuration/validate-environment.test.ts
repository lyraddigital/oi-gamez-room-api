import {
  verifyCorsAllowedOrigin,
  verifyDynamoTableName,
  verifyDynamoVisibleRoomIndexName,
  verifyPublicRoomsToRetrieve,
} from "@oigamez/configuration";

jest.mock("@oigamez/configuration");

import { validateEnvironment } from "./validate-environment";

describe("validateEnvironment for get public rooms handler tests", () => {
  test("correct verify mocks were called", () => {
    // Arrange / Action
    validateEnvironment();

    // Assert
    expect(verifyCorsAllowedOrigin).toHaveBeenCalled();
    expect(verifyDynamoTableName).toHaveBeenCalled();
    expect(verifyDynamoVisibleRoomIndexName).toHaveBeenCalled();
    expect(verifyPublicRoomsToRetrieve).toHaveBeenCalled();
  });
});
