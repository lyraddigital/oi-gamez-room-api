import { okResponse } from "./ok-response";

describe("okResponse tests", () => {
  test("Correct reponse is generated with an server error status code with correct data", () => {
    // Arrange / Action
    const response = okResponse();

    // Assert
    expect(response).toBeDefined();
    expect(response.statusCode).toBe(200);
    expect(response.headers!["content-type"]).toBe("application/json");
    expect(response.body).toEqual(JSON.stringify({}));
  });
});
