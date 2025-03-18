import { badRequestResponse } from "./bad-request";

describe("badRequestResponse tests", () => {
  test("Correct reponse is generated with correct status code", () => {
    // Arrange
    const errorMessages = ["first error", "second error"];

    // Action
    const response = badRequestResponse(errorMessages);

    // Assert
    expect(response).toBeDefined();
    expect(response.statusCode).toBe(400);
    expect(response.headers!["content-type"]).toBe("application/json");
    expect(response.body).toEqual(JSON.stringify({ errorMessages }));
  });
});
