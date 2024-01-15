import { APIGatewayProxyEvent } from "aws-lambda";

export const getDataFromCookie = (
  event: APIGatewayProxyEvent,
  cookieName: string
): string | undefined => {
  const cookieHeader = event?.headers ? event.headers["Cookie"] : undefined;

  if (!cookieHeader) {
    return undefined;
  }

  const cookies = cookieHeader.split(";");
  const cookieMap = new Map<string, string>();

  cookies.forEach((c) => {
    const cookieParts = c.split("=");
    cookieMap.set(cookieParts[0], cookieParts[1]);
  });

  return cookieMap.get(cookieName);
};
