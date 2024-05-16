export class Twitte {
  value: string;

  constructor(value: string) {
    this.value = value;
  }

  static characterLimit(value: string): string {
    if (value.length > 280) {
      throw new Error("The post must not contain more than 280 characters");
    }
    return value;
  }
}
