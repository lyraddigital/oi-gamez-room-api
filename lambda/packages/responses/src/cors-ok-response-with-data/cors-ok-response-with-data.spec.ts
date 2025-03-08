import { corsOkResponseWithData } from "./cors-ok-response-with-data";

jest.mock("@oigamez/configuration", () => {
  return {
    CORS_ALLOWED_ORIGINS: "http://localhost",
  };
});

describe("corsOkResponseWithData tests", () => {
  it("Correct reponse is generated with an ok status code with correct data", () => {
    // Arrange
    const data = { name: "Daryl" };

    // Action
    const response = corsOkResponseWithData(data);

    // Assert
    expect(response).toBeDefined();
    expect(response.statusCode).toBe(200);
    expect(response.headers!["access-control-allow-origin"]).toBe(
      "http://localhost"
    );
    expect(response.headers!["content-type"]).toBe("application/json");
    expect(response.body).toEqual(JSON.stringify(data));
  });
});
