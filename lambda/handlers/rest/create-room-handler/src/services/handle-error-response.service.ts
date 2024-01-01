export const handleErrorResponse = (e: unknown) => {
  let errorMessage =
    "Unknown issue while trying to check the status of a game code.";
  const exceptionName = (e as Error)?.name;

  if (exceptionName === "RoomsExhaustedError") {
    errorMessage = "All rooms have been exhausted. Try again later.";
  }

  return errorMessage;
};
