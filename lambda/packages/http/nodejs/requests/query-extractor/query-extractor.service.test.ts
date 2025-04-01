import {
  APIGatewayProxyEvent,
  APIGatewayProxyEventPathParameters,
} from "aws-lambda";

import { extractFromQueryString } from "./query-extractor.service";

describe("extractFromQueryString tests", () => {
  test("event is undefined, returns undefined", () => {
    // Arrange
    const pathKey = "roomCode";

    // Action
    const result = extractFromQueryString(undefined, pathKey);

    // Assert
    expect(result).toBeUndefined();
  });

  test("event queryStringParameters is undefined, returns undefined", () => {
    // Arrange
    const pathKey = "roomCode";
    const event = {} as APIGatewayProxyEvent;

    // Action
    const result = extractFromQueryString(event, pathKey);

    // Assert
    expect(result).toBeUndefined();
  });

  test("event queryStringParameters is set but key does not exist, returns undefined", () => {
    // Arrange
    const pathKey = "roomCode";
    const event = {
      pathParameters: {} as APIGatewayProxyEventPathParameters,
    } as APIGatewayProxyEvent;

    // Action
    const result = extractFromQueryString(event, pathKey);

    // Assert
    expect(result).toBeUndefined();
  });

  test("event query string parameter key is set, returns path parameter's value", () => {
    // Arrange
    const queryStringKey = "roomCode";
    const queryStringValue = "ABCD";
    const event = {
      queryStringParameters: {
        [queryStringKey]: queryStringValue,
      } as APIGatewayProxyEventPathParameters,
    } as APIGatewayProxyEvent;

    // Action
    const result = extractFromQueryString(event, queryStringKey);

    // Assert
    expect(result).toBeDefined();
    expect(result).toBe(queryStringValue);
  });
});
