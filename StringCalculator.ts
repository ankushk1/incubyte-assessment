class StringCalculator {
  add(numString: string): number {
    // Check for empty string
    if (!numString) return 0;

    let delimiters = [",", "\n"];
    let numbersSection = numString;
  
    const numberArray = numbersSection
      .split(delimiters.join("|"))
      .filter((n) => n.trim() !== "")
      .map((n) => Number(n));

    // negative number will throw an exception
    const negatives = numberArray.filter((n) => n < 0);
    if (negatives.length > 0) {
      throw new Error(`negative numbers not allowed: ${negatives.join(",")}`);
    }

    return numberArray.reduce((sum, n) => sum + n, 0);
  }
}

const calculator = new StringCalculator();
console.log(calculator.add("1,2,3")); // Output: 6
console.log(calculator.add("1\n2,7")); // Output: 10
