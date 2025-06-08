export class RoomsExhaustedError extends Error {
  constructor(message: string) {
    super(message);

    this.name = "RoomsExhaustedError";
  }
}
