import { corsBadRequestResponse } from "./cors-bad-request";

describe("corsBadRequestResponse tests", () => {
  test("Correct reponse is generated with correct status code", () => {
    // Arrange
    const corsAllowedOrigins = "http://localhost";
    const errorMessages = ["first error", "second error"];

    // Action
    const response = corsBadRequestResponse(corsAllowedOrigins, errorMessages);

    // Assert
    expect(response).toBeDefined();
    expect(response.statusCode).toBe(400);
    expect(response.headers!["access-control-allow-origin"]).toBe(
      corsAllowedOrigins
    );
    expect(response.headers!["content-type"]).toBe("application/json");
    expect(response.body).toEqual(JSON.stringify({ errorMessages }));
  });
});
