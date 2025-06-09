"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringCalculator = void 0;
class StringCalculator {
    // Escape special characters in a string
    escapeRegExp(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
    add(numString) {
        // Check for empty string
        if (!numString)
            return 0;
        let delimiters = [",", "\n"];
        let numbersSection = numString;
        // Check for custom delimiter for special characters
        const customDelimiterMatch = numString.match(/^\/\/(.+)\n/);
        if (customDelimiterMatch) {
            const delimiterSpec = customDelimiterMatch[1];
            if (delimiterSpec.startsWith("[") && delimiterSpec.endsWith("]")) {
                const regex = /\[([^\]]+)\]/g;
                let match;
                delimiters = [];
                while ((match = regex.exec(delimiterSpec)) !== null) {
                    delimiters.push(match[1]);
                }
            }
            else {
                delimiters = [delimiterSpec];
            }
            numbersSection = numString.split("\n").slice(1).join("\n");
        }
        const updatedDelimiterRegex = new RegExp(delimiters.map((d) => this.escapeRegExp(d)).join("|"), "g");
        const numberArray = numbersSection
            .split(updatedDelimiterRegex)
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
exports.StringCalculator = StringCalculator;
