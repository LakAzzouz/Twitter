export class Twitte {
  constructor() {}

  static characterLimit(value: string): string {
    if (value.length > 280) {
      throw new Error("The post must not contain more than 280 characters");
    }
    return value;
  }
}
