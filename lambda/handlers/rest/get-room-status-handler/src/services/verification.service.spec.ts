import { VerificationResult } from "@oigamez/models";

import { validateRequest } from "../validators";
import { verifyRequestData } from "./verification.service";

jest.mock("../validators");

describe("verifyRequestData tests", () => {
  it("validation fails, returns an unsuccessful verification result", () => {
    // Arrange
    const origin = "http://localhost:8000";
    const roomCode = "ABCD";
    const validateResult = {
      isSuccessful: false,
      errorMessages: ["Invalid data"],
    } as VerificationResult;

    (
      validateRequest as jest.MockedFunction<typeof validateRequest>
    ).mockReturnValueOnce(validateResult);

    // Action
    const verificationResult = verifyRequestData(origin, roomCode);

    // Assert
    expect(verificationResult).toBeDefined();
    expect(verificationResult.isSuccessful).toBe(false);
    expect(verificationResult.errorMessages).toBe(validateResult.errorMessages);
    expect(validateRequest).toHaveBeenCalledWith(origin, roomCode);
  });

  it("validation succeeds, returns a successful verification result", () => {
    // Arrange
    const origin = "http://localhost:8000";
    const roomCode = "ABCD";
    const validateResult = {
      isSuccessful: true,
      errorMessages: [],
    } as VerificationResult;

    (
      validateRequest as jest.MockedFunction<typeof validateRequest>
    ).mockReturnValueOnce(validateResult);

    // Action
    const verificationResult = verifyRequestData(origin, roomCode);

    // Assert
    expect(verificationResult).toBeDefined();
    expect(verificationResult.isSuccessful).toBe(true);
    expect(verificationResult.errorMessages).toHaveLength(0);
  });
});
