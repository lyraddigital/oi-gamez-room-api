import { APIGatewayProxyEvent, APIGatewayProxyEventHeaders } from "aws-lambda";

import { extractHeader } from "./header-extractor.service";

describe("extractHeader tests", () => {
  type TestType = {
    firstName: string;
    lastName: string;
  };

  it("event is undefined, returns undefined", () => {
    // Arrange
    const headerKey = "Origin";

    // Action
    const result = extractHeader(undefined, headerKey);

    // Assert
    expect(result).toBeUndefined();
  });

  it("event headers is undefined, returns undefined", () => {
    // Arrange
    const headerKey = "Origin";
    const event = {} as APIGatewayProxyEvent;

    // / Action
    const result = extractHeader(event, headerKey);

    // Assert
    expect(result).toBeUndefined();
  });

  it("event header is set but key does not exist, returns undefined", () => {
    // Arrange
    const headerKey = "Origin";
    const event = {
      headers: {} as APIGatewayProxyEventHeaders,
    } as APIGatewayProxyEvent;

    // / Action
    const result = extractHeader(event, headerKey);

    // Assert
    expect(result).toBeUndefined();
  });

  it("event header key is set, returns header's value", () => {
    // Arrange
    const headerKey = "Origin";
    const headerValue = "http://localhost:3000";
    const event = {
      headers: {
        [headerKey]: headerValue,
      } as APIGatewayProxyEventHeaders,
    } as APIGatewayProxyEvent;

    // / Action
    const result = extractHeader(event, headerKey);

    // Assert
    expect(result).toBeDefined();
    expect(result).toBe(headerValue);
  });
});
