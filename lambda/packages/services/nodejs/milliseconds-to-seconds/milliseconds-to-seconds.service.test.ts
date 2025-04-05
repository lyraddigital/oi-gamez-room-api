import { convertFromMillisecondsToSeconds } from "./milliseconds-to-seconds.service";

describe("convertFromMillisecondsToSeconds tests", () => {
  test("Milliseconds fit perfectly into seconds, returns correct seconds", () => {
    // Arrange
    const milliseconds = 3000;

    // Action
    const seconds = convertFromMillisecondsToSeconds(milliseconds);

    // Assert
    expect(seconds).toBe(3);
  });

  test("Milliseconds does not fit perfectly into seconds, returns correct seconds", () => {
    // Arrange
    const milliseconds = 3750;

    // Action
    const seconds = convertFromMillisecondsToSeconds(milliseconds);

    // Assert
    expect(seconds).toBe(3);
  });
});
