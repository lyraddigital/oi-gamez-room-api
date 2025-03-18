import { incrementAndReturnInSeconds } from "./increment-and-convert-to-seconds.service";

describe("incrementAndReturnInSeconds tests", () => {
  test("Milliseconds fit perfectly into seconds, returns correct seconds after addition", () => {
    // Arrange
    const milliseconds = 3000;
    const secondsToAdd = 60;

    // Action
    const seconds = incrementAndReturnInSeconds(milliseconds, secondsToAdd);

    // Assert
    expect(seconds).toBe(63);
  });

  test("Milliseconds does not fit perfectly into seconds, returns correct seconds after addition", () => {
    // Arrange
    const milliseconds = 3750;
    const secondsToAdd = 60;

    // Action
    const seconds = incrementAndReturnInSeconds(milliseconds, secondsToAdd);

    // Assert
    expect(seconds).toBe(63);
  });
});
