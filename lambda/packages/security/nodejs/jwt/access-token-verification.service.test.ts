import { JwtPayload, sign, TokenExpiredError } from "jsonwebtoken";

describe("verifyAccessToken tests", () => {
  test("token has expired, throws an error", async () => {
    // Arrange
    const jwtSecretKey = "SomeJWTSecretKey";
    const expiryInMinutes = -5;

    jest.doMock("/opt/nodejs/oigamez-core.js", () => {
      return {
        JWT_SECRET_KEY: jwtSecretKey,
      };
    });

    const { verifyAccessToken } = await import(
      "./access-token-verification.service.js"
    );
    const payload = {
      roomCode: "ABCD",
      username: "daryl_duck",
    };
    const accessToken = sign(payload, jwtSecretKey, {
      expiresIn: `${expiryInMinutes} minutes`,
    });

    // Action / Assert
    expect(() => verifyAccessToken(accessToken)).toThrow(TokenExpiredError);
  });

  test("token has not expired, returns correct payload", async () => {
    // Arrange
    const jwtSecretKey = "SomeJWTSecretKey";
    const expiryInMinutes = 5;

    jest.doMock("/opt/nodejs/oigamez-core.js", () => {
      return {
        JWT_SECRET_KEY: jwtSecretKey,
      };
    });

    const { verifyAccessToken } = await import(
      "./access-token-verification.service.js"
    );
    const payload = {
      roomCode: "ABCD",
      username: "daryl_duck",
    };
    const accessToken = sign(payload, jwtSecretKey, {
      expiresIn: `${expiryInMinutes} minutes`,
    });

    // Action
    const verifiedPayload = verifyAccessToken(accessToken);
    const verifiedTokenJWT = verifiedPayload as JwtPayload;
    const verifiedTokenData = verifiedPayload as {
      roomCode: string;
      username: string;
    };

    // Assert
    expect(verifiedTokenData.roomCode).toBe(payload.roomCode);
    expect(verifiedTokenData.username).toBe(payload.username);
    expect(verifiedTokenJWT.exp).toBe(verifiedTokenJWT.iat! + 300);
  });
});
