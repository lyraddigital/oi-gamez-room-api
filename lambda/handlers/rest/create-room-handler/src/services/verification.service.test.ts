import { GameType } from "/opt/nodejs/oigamez-core";
import { ValidationResult } from "/opt/nodejs/oigamez-http";

import { CreateRoomPayload } from "../models";
import { getRoomHostingData } from "../repositories";
import { runCreateRoomRuleSet } from "../rule-sets";
import { validateRequest } from "../validators";
import { verifyRequestData } from "./verification.service";

jest.mock("../repositories");
jest.mock("../rule-sets");
jest.mock("../validators");

describe("create room verification tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("validation of the data fails, returns an unsuccessful verification result", async () => {
    // Arrange
    const origin: string | undefined = undefined;
    const payload: CreateRoomPayload | undefined = undefined;
    const validateRequestResult: ValidationResult = {
      isSuccessful: false,
      errorMessages: ["Some validation error"],
    };
    (
      validateRequest as jest.MockedFunction<typeof validateRequest>
    ).mockReturnValueOnce(validateRequestResult);

    // Action
    const result = await verifyRequestData(origin, payload);

    // Assert
    expect(result.isSuccessful).toBe(false);
    expect(result.errorMessages).toHaveLength(1);
    expect(result.errorMessages[0]).toBe(
      validateRequestResult.errorMessages[0]
    );
    expect(result.data).toBeUndefined();

    expect(validateRequest).toHaveBeenCalledWith(undefined, undefined);
  });

  test("validation of the data passes, but ruleset fails, returns an unsuccessful verification result", async () => {
    // Arrange
    const origin: string = "http://localhost:8000";
    const gameType: GameType | undefined = {} as GameType;
    const isAlreadyHosting = true;
    const payload = {
      title: "A room",
      gameTypeId: 1,
      hostUsername: "daryl_duck",
    } as CreateRoomPayload;
    const validateRequestResult: ValidationResult = {
      isSuccessful: true,
      errorMessages: [],
    };
    const rulesetResult: ValidationResult = {
      isSuccessful: false,
      errorMessages: ["Some ruleset error"],
    };
    (
      validateRequest as jest.MockedFunction<typeof validateRequest>
    ).mockReturnValueOnce(validateRequestResult);
    (
      getRoomHostingData as jest.MockedFunction<typeof getRoomHostingData>
    ).mockResolvedValueOnce([gameType, isAlreadyHosting]);
    (
      runCreateRoomRuleSet as jest.MockedFunction<typeof runCreateRoomRuleSet>
    ).mockReturnValueOnce(rulesetResult);

    // Action
    const result = await verifyRequestData(origin, payload);

    // Assert
    expect(result.isSuccessful).toBe(false);
    expect(result.errorMessages).toHaveLength(1);
    expect(result.errorMessages[0]).toBe(rulesetResult.errorMessages[0]);
    expect(result.data).toBeUndefined();

    expect(validateRequest).toHaveBeenCalledWith(origin, payload);
    expect(getRoomHostingData).toHaveBeenCalledWith(
      payload.gameTypeId,
      payload.hostUsername
    );
    expect(runCreateRoomRuleSet).toHaveBeenCalledWith(
      gameType,
      isAlreadyHosting
    );
  });

  test("validation and ruleset passes, returns a successful verification result", async () => {
    // Arrange
    const origin: string = "http://localhost:8000";
    const gameType: GameType | undefined = {} as GameType;
    const isAlreadyHosting = true;
    const payload = {
      title: "A room",
      gameTypeId: 1,
      hostUsername: "daryl_duck",
    } as CreateRoomPayload;
    const validateRequestResult: ValidationResult = {
      isSuccessful: true,
      errorMessages: [],
    };
    const rulesetResult: ValidationResult = {
      isSuccessful: true,
      errorMessages: [],
    };
    (
      validateRequest as jest.MockedFunction<typeof validateRequest>
    ).mockReturnValueOnce(validateRequestResult);
    (
      getRoomHostingData as jest.MockedFunction<typeof getRoomHostingData>
    ).mockResolvedValueOnce([gameType, isAlreadyHosting]);
    (
      runCreateRoomRuleSet as jest.MockedFunction<typeof runCreateRoomRuleSet>
    ).mockReturnValueOnce(rulesetResult);

    // Action
    const result = await verifyRequestData(origin, payload);

    // Assert
    expect(result.isSuccessful).toBe(true);
    expect(result.errorMessages).toHaveLength(0);
    expect(result.data).toBe(gameType);

    expect(validateRequest).toHaveBeenCalledWith(origin, payload);
    expect(getRoomHostingData).toHaveBeenCalledWith(
      payload.gameTypeId,
      payload.hostUsername
    );
    expect(runCreateRoomRuleSet).toHaveBeenCalledWith(
      gameType,
      isAlreadyHosting
    );
  });
});
