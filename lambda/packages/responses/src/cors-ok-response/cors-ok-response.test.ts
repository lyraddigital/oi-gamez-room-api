import { corsOkResponse } from "./cors-ok-response";

jest.mock("@oigamez/configuration", () => {
  return {
    CORS_ALLOWED_ORIGINS: "http://localhost",
  };
});

describe("corsOkResponse tests", () => {
  test("Correct reponse is generated with an ok status code when no status code is passed", () => {
    // Arrange / Action
    const response = corsOkResponse();

    // Assert
    expect(response).toBeDefined();
    expect(response.statusCode).toBe(200);
    expect(response.headers!["access-control-allow-origin"]).toBe(
      "http://localhost"
    );
    expect(response.headers!["content-type"]).toBe("application/json");
    expect(response.body).toEqual(JSON.stringify({}));
  });

  test("Correct reponse is generated with the correct status code when the status code is passed", () => {
    // Arrange
    const statusCode = 201;

    // / Action
    const response = corsOkResponse(statusCode);

    // Assert
    expect(response).toBeDefined();
    expect(response.statusCode).toBe(statusCode);
    expect(response.headers).toBeDefined();
    expect(response.headers!["access-control-allow-origin"]).toBeDefined();
    expect(response.headers!["access-control-allow-origin"]).toBe(
      "http://localhost"
    );
    expect(response.headers!["content-type"]).toBeDefined();
    expect(response.headers!["content-type"]).toBe("application/json");
    expect(response.body).toEqual(JSON.stringify({}));
  });
});
