import { RoomsExhaustedError } from "../errors";
import { getAnAvailableDivisionAndGroupCode } from "./available-division-and-group-code.service";

describe("getAnAvailableDivisionAndGroupCode tests", () => {
  const randomSpy = jest.spyOn<Math, "random">(Math, "random");

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("no division and group codes unavailable, get the correct division and group code at first position", () => {
    // Arrange
    randomSpy.mockReturnValueOnce(0);

    // Action
    const [divisionCode, groupCode] = getAnAvailableDivisionAndGroupCode([]);

    // Assert
    expect(divisionCode).toBe("A");
    expect(groupCode).toBe("A");
  });

  it("division and group codes unavailable, get the correct division and group code at first position", () => {
    // Arrange
    const divisionCodes = "AB";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const unavailableDivisionAndGroupCodes: string[] = [];

    [...divisionCodes].forEach((dc) => {
      [...characters].forEach((c) => {
        unavailableDivisionAndGroupCodes.push(`${dc}${c}`);
      });
    });

    randomSpy.mockReturnValueOnce(0);

    // Action
    const [divisionCode, groupCode] = getAnAvailableDivisionAndGroupCode(
      unavailableDivisionAndGroupCodes
    );

    // Assert
    expect(divisionCode).toBe("C");
    expect(groupCode).toBe("A");
  });

  it("all division and group codes unavailable, throws a rooms exhausted error", () => {
    // Arrange
    const divisionCodes = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const unavailableDivisionAndGroupCodes: string[] = [];

    [...divisionCodes].forEach((dc) => {
      [...characters].forEach((c) => {
        unavailableDivisionAndGroupCodes.push(`${dc}${c}`);
      });
    });

    randomSpy.mockReturnValueOnce(0);

    // Action
    try {
      getAnAvailableDivisionAndGroupCode(unavailableDivisionAndGroupCodes);

      throw new Error("Did not raise a RoomsExhaustedException");
    } catch (e: any) {
      const isRoomsExhaustedException = !!(e as RoomsExhaustedError).name;
      expect(isRoomsExhaustedException).toBe(true);
    }
  });
});
