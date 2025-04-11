import { JwtPayload, verify } from "jsonwebtoken";

describe("generateAccessToken tests", () => {
  test("signs a token successfully with the correct payload", async () => {
    // Arrange
    const jwtSecretKey = "SomeJWTSecretKey";
    const expiryInMinutes = 5;

    jest.doMock("/opt/nodejs/oigamez-core.js", () => {
      return {
        JWT_SECRET_KEY: jwtSecretKey,
      };
    });

    const { generateAccessToken } = await import(
      "./access-token-generation.service.js"
    );
    const payload = {
      roomCode: "ABCD",
      username: "daryl_duck",
    };

    // Action
    const accessToken = generateAccessToken(payload, expiryInMinutes);

    // Assert
    const verifiedToken = verify(accessToken, jwtSecretKey);
    const verifiedTokenJWT = verifiedToken as JwtPayload;
    const verifiedTokenData = verifiedToken as {
      roomCode: string;
      username: string;
    };

    expect(verifiedTokenJWT).toBeDefined();
    expect(verifiedTokenJWT.exp).toBe(verifiedTokenJWT.iat! + 300); // 5 minute expiry
    expect(verifiedTokenData.roomCode).toBe(payload.roomCode);
    expect(verifiedTokenData.username).toBe(payload.username);
  });
});
