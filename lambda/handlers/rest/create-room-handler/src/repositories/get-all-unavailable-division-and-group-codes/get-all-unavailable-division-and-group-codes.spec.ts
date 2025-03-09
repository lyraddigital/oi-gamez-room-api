import {
  DynamoDBClient,
  QueryCommand,
  QueryCommandOutput,
} from "@aws-sdk/client-dynamodb";
import { dbClient } from "@oigamez/dynamodb";

import { mapFromDynamoToUnavailableRoomCode } from "../../mappers";
import { getAllUnavailableDivisionAndGroupCodes } from "./get-all-unavailable-division-and-group-codes";

jest.mock("@oigamez/configuration", () => {
  return {
    DYNAMO_TABLE_NAME: "SomeTable",
  };
});
jest.mock("../../mappers");

describe("getAllUnavailableDivisionAndGroupCodes tests", () => {
  const sendSpy = jest.spyOn<DynamoDBClient, "send">(dbClient, "send");

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("makes the correct query to dynamo db and returns mapped response", async () => {
    // Arrange
    const divisionAndGroupCode = "AA";
    const queryResponse: QueryCommandOutput = {
      Items: [{}],
      $metadata: {},
    };

    (
      mapFromDynamoToUnavailableRoomCode as jest.MockedFunction<
        typeof mapFromDynamoToUnavailableRoomCode
      >
    ).mockReturnValue(divisionAndGroupCode);

    sendSpy.mockReturnValueOnce(queryResponse as any);

    // Action
    const results = await getAllUnavailableDivisionAndGroupCodes();

    // Assert
    expect(sendSpy.mock.calls.length).toBe(1);
    expect((sendSpy.mock.calls[0][0] as QueryCommand).input.TableName).toBe(
      "SomeTable"
    );
    expect(
      (sendSpy.mock.calls[0][0] as QueryCommand).input.KeyConditionExpression
    ).toBe("#pk = :pk");
    expect(
      (sendSpy.mock.calls[0][0] as QueryCommand).input.ExpressionAttributeNames
    ).toEqual({ "#pk": "PK" });
    expect(
      (sendSpy.mock.calls[0][0] as QueryCommand).input.ExpressionAttributeValues
    ).toEqual({ ":pk": { S: "UnavailableDivisionAndGroupCodes" } });
    expect(results).toBeDefined();
    expect(results.length).toBe(1);
    expect(results[0]).toBe(divisionAndGroupCode);
  });

  it("dynamo db query returns an empty array, returns an empty array overall", async () => {
    // Arrange
    const queryResponse: QueryCommandOutput = {
      Items: [],
      $metadata: {},
    };

    sendSpy.mockReturnValueOnce(queryResponse as any);

    // Action
    const results = await getAllUnavailableDivisionAndGroupCodes();

    // Assert
    expect(results).toBeDefined();
    expect(results.length).toBe(0);
  });
});
