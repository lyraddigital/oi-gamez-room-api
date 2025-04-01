import { corsOkResponseWithData } from "./cors-ok-response-with-data";

describe("corsOkResponseWithData tests", () => {
  test("Correct reponse is generated with an ok status code with correct data", () => {
    // Arrange
    const corsAllowedOrigins = "http://localhost";
    const data = { name: "Daryl" };

    // Action
    const response = corsOkResponseWithData(corsAllowedOrigins, data);

    // Assert
    expect(response).toBeDefined();
    expect(response.statusCode).toBe(200);
    expect(response.headers!["access-control-allow-origin"]).toBe(
      corsAllowedOrigins
    );
    expect(response.headers!["content-type"]).toBe("application/json");
    expect(response.body).toEqual(JSON.stringify(data));
  });
});
