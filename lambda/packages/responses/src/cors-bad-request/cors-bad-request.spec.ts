import { corsBadRequestResponse } from "./cors-bad-request";

jest.mock("@oigamez/configuration", () => {
  return {
    CORS_ALLOWED_ORIGINS: "http://localhost",
  };
});

describe("corsBadRequestResponse tests", () => {
  it("Correct reponse is generated with correct status code", () => {
    // Arrange
    const errorMessages = ["first error", "second error"];

    // Action
    const response = corsBadRequestResponse(errorMessages);

    // Assert
    expect(response).toBeDefined();
    expect(response.statusCode).toBe(400);
    expect(response.headers!["access-control-allow-origin"]).toBe(
      "http://localhost"
    );
    expect(response.headers!["content-type"]).toBe("application/json");
    expect(response.body).toEqual(JSON.stringify({ errorMessages }));
  });
});
