import { APIGatewayProxyEvent } from "aws-lambda";

import { parseBody } from "./body-parser.service";

describe("parseBody tests", () => {
  type TestType = {
    firstName: string;
    lastName: string;
  };

  it("event is undefined, returns undefined", () => {
    // Arrange / Action
    const result = parseBody(undefined);

    // Assert
    expect(result).toBeUndefined();
  });

  it("event body is undefined, returns undefined", () => {
    // Arrange
    const event = {} as APIGatewayProxyEvent;

    // / Action
    const result = parseBody(event);

    // Assert
    expect(result).toBeUndefined();
  });

  it("event body set but is not valid json, returns undefined", () => {
    // Arrange
    const event = {
      body: '{"invalid:"json"}',
    } as APIGatewayProxyEvent;

    // / Action
    const result = parseBody(event);

    // Assert
    expect(result).toBeUndefined();
  });

  it("event body is valid json, returns an object", () => {
    // Arrange
    const aType: TestType = {
      firstName: "Daryl",
      lastName: "Duck",
    };
    const event = {
      body: JSON.stringify(aType),
    } as APIGatewayProxyEvent;

    // / Action
    const result = parseBody(event);

    // Assert
    expect(result).toBeDefined();
    expect(result).toEqual(aType);
  });
});
