import { initializeEventPublisherForInternal } from "@oigamez/communication";

import { initializeLambda } from "./initialize-lambda.service.js";

jest.mock("@oigamez/core", () => {
  return {
    EB_INTERNAL_EB_NAME: "Internal Event Bus",
    EB_INTERNAL_EVENT_SOURCE_NAME: "Internal Event Bus Source",
  };
});
jest.mock("/opt/nodejs/oigamez-communication");

describe("initializeLambda tests for game completed subscription lambda", () => {
  test("Calls initialize function", () => {
    // Arrange / Action
    initializeLambda();

    // Assert
    expect(initializeEventPublisherForInternal).toHaveBeenCalledWith(
      "Internal Event Bus",
      "Internal Event Bus Source"
    );
  });
});
