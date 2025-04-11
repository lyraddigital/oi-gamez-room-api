import {
  verifyCorsAllowedOrigin,
  verifyDynamoTableName,
} from "/opt/nodejs/oigamez-core.js";

import { verifyPublicRoomsToRetrieve } from "./public-rooms-to-retrieve/index.js";
import { verifyDynamoVisibleRoomIndexName } from "./visible-room-index-name/index.js";
import { validateEnvironment } from "./validate-environment.js";

jest.mock("/opt/nodejs/oigamez-core.js");
jest.mock("./public-rooms-to-retrieve/index.js");
jest.mock("./visible-room-index-name/index.js");

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
