import { getNow } from "./dates.service";

describe("getNow tests", () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2020, 3, 1));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test("calls the Date object constructor", () => {
    // Arrange / Action
    const date = getNow();

    // Assert
    expect(date.getDate()).toBe(1);
    expect(date.getMonth()).toBe(3);
    expect(date.getFullYear()).toBe(2020);
  });
});
