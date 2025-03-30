import {
  verifyCorsAllowedOrigin,
  verifyDynamoTableName,
} from "@oigamez/configuration";

import { verifyPublicRoomsToRetrieve } from "./public-rooms-to-retrieve";
import { verifyDynamoVisibleRoomIndexName } from "./visible-room-index-name";
import { validateEnvironment } from "./validate-environment";

jest.mock("@oigamez/configuration");
jest.mock("./public-rooms-to-retrieve");
jest.mock("./visible-room-index-name");

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
