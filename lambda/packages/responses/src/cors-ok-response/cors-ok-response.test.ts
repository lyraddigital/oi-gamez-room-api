import { corsOkResponse } from "./cors-ok-response";

describe("corsOkResponse tests", () => {
  test("Correct reponse is generated with an ok status code when no status code is passed", () => {
    // Arrange
    const corsAllowedOrigins = "http://localhost";

    // Action
    const response = corsOkResponse(corsAllowedOrigins);

    // Assert
    expect(response).toBeDefined();
    expect(response.statusCode).toBe(200);
    expect(response.headers!["access-control-allow-origin"]).toBe(
      corsAllowedOrigins
    );
    expect(response.headers!["content-type"]).toBe("application/json");
    expect(response.body).toEqual(JSON.stringify({}));
  });

  test("Correct reponse is generated with the correct status code when the status code is passed", () => {
    // Arrange
    const corsAllowedOrigins = "http://localhost";
    const statusCode = 201;

    // / Action
    const response = corsOkResponse(corsAllowedOrigins, statusCode);

    // Assert
    expect(response).toBeDefined();
    expect(response.statusCode).toBe(statusCode);
    expect(response.headers).toBeDefined();
    expect(response.headers!["access-control-allow-origin"]).toBeDefined();
    expect(response.headers!["access-control-allow-origin"]).toBe(
      corsAllowedOrigins
    );
    expect(response.headers!["content-type"]).toBeDefined();
    expect(response.headers!["content-type"]).toBe("application/json");
    expect(response.body).toEqual(JSON.stringify({}));
  });
});
