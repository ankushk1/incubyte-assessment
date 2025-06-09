import { StringCalculator } from './StringCalculator';

describe("StringCalculator", () => {
  let calculator: StringCalculator;

  beforeEach(() => {
    calculator = new StringCalculator();
  });

  test("should return 0 for empty string", () => {
    expect(calculator.add("")).toBe(0);
  });

  test("should return the number itself for a single number", () => {
    expect(calculator.add("1")).toBe(1);
  });

  test("should return add of two numbers", () => {
    expect(calculator.add("1,5")).toBe(6);
  });

  test("should handle multiple numbers", () => {
    expect(calculator.add("1,2,3,4")).toBe(10);
  });

  test("should handle newlines as delimiters", () => {
    expect(calculator.add("1\n2,3")).toBe(6);
  });

  test("should support custom single-character delimiter", () => {
    expect(calculator.add("//;\n1;2")).toBe(3);
  });

  test("should support custom multi-character delimiter", () => {
    expect(calculator.add("//[***]\n1***2***3")).toBe(6);
  });

  test("should support multiple delimiters", () => {
    expect(calculator.add("//[*][%]\n1*2%3")).toBe(6);
  });

  test("should support multiple multi-character delimiters", () => {
    expect(calculator.add("//[***][###]\n1***2###3")).toBe(6);
  });

  test("should throw error for negative numbers", () => {
    expect(() => calculator.add("1,-2,3,-4")).toThrow("negative numbers not allowed: -2,-4");
  });
});
