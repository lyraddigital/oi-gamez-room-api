import {
  APIGatewayProxyEvent,
  APIGatewayProxyEventPathParameters,
} from "aws-lambda";

import { extractFromPath } from "./path-extractor.service";

describe("extractFromPath tests", () => {
  test("event is undefined, returns undefined", () => {
    // Arrange
    const pathKey = "roomCode";

    // Action
    const result = extractFromPath(undefined, pathKey);

    // Assert
    expect(result).toBeUndefined();
  });

  test("event pathParameters is undefined, returns undefined", () => {
    // Arrange
    const pathKey = "roomCode";
    const event = {} as APIGatewayProxyEvent;

    // Action
    const result = extractFromPath(event, pathKey);

    // Assert
    expect(result).toBeUndefined();
  });

  test("event pathParameters is set but key does not exist, returns undefined", () => {
    // Arrange
    const pathKey = "roomCode";
    const event = {
      pathParameters: {} as APIGatewayProxyEventPathParameters,
    } as APIGatewayProxyEvent;

    // Action
    const result = extractFromPath(event, pathKey);

    // Assert
    expect(result).toBeUndefined();
  });

  test("event path parameter key is set, returns path parameter's value", () => {
    // Arrange
    const pathKey = "roomCode";
    const pathValue = "ABCD";
    const event = {
      pathParameters: {
        [pathKey]: pathValue,
      } as APIGatewayProxyEventPathParameters,
    } as APIGatewayProxyEvent;

    // Action
    const result = extractFromPath(event, pathKey);

    // Assert
    expect(result).toBeDefined();
    expect(result).toBe(pathValue);
  });
});
