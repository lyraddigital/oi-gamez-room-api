import { fatalErrorResponse } from "./fatal-error-response";

describe("fatalErrorResponse tests", () => {
  it("Correct reponse is generated with an server error status code with correct data", () => {
    // Arrange
    const errorMessage = "some error";

    // Action
    const response = fatalErrorResponse(errorMessage);

    // Assert
    expect(response).toBeDefined();
    expect(response.statusCode).toBe(500);
    expect(response.headers!["content-type"]).toBe("application/json");
    expect(response.body).toEqual(
      JSON.stringify({ errorMessages: [errorMessage] })
    );
  });
});
