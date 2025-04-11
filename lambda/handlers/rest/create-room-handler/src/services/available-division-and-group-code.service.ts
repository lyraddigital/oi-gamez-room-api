import { RoomsExhaustedError } from "../errors/index.js";

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const allAvailableCodes: string[] = [];

[...characters].forEach((c) => {
  [...characters].forEach((c2) => {
    allAvailableCodes.push(`${c}${c2}`);
  });
});

export const getAnAvailableDivisionAndGroupCode = (
  unavailableDivisionAndGroupRoomCodes: string[]
): [string, string] => {
  const orderedUnavailableDivisionAndGroupRoomCodes = [
    ...unavailableDivisionAndGroupRoomCodes.sort(),
  ];
  const adjustedAvailableCodes = allAvailableCodes.filter(
    (ac) =>
      !orderedUnavailableDivisionAndGroupRoomCodes.find((urc) => urc === ac)
  );

  if (adjustedAvailableCodes.length == 0) {
    throw new RoomsExhaustedError(
      "We have no room division / group codes in order to allocate a room."
    );
  }

  const availableDivisionAndGroupCodeIndex = Math.floor(
    Math.random() * adjustedAvailableCodes.length
  );

  return [
    adjustedAvailableCodes[availableDivisionAndGroupCodeIndex][0],
    adjustedAvailableCodes[availableDivisionAndGroupCodeIndex][1],
  ];
};
