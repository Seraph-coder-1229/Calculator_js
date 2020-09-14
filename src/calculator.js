/**
 * @module src/calculator
 *
 */

/** Calculator Class */

class Calculator {
	/**
	 * @param {HTMLElement} previousOperand - The HTML element to display the previous values.
	 * @param {HTMLElement} currentOperand - The HTML element to display the current values.
	 */

	constructor(previousOperand, currentOperand) {
		this.previousOperandTextElement = previousOperand;
		this.currentOperandTextElement = currentOperand;
		this.operation = undefined;
		this.clear();
	}
	/** Clear all assignments */
	clear() {
		this.previousOperand = "";
		this.currentOperand = "";
		this.operation = undefined;
	}

	delete() {
		if (this.currentOperand !== "") {
			// Make a string and grab all indexs from 0 to length - 1 and assign that to current.
			this.currentOperand = this.currentOperand.toString().slice(0, -1);
		} else {
			return;
		}
	}

	appendNumber(number) {
		if (number === "." && this.currentOperand.includes(".")) return;
		this.currentOperand = this.currentOperand.toString() + number.toString();
	}

	chooseOperation(operation) {
		// If there is not a current operand there is no reason to proceed.
		if (this.currentOperand === "") return;

		// this allows for the chaining to be executed
		if (this.previousOperand !== "") {
			this.compute();
		}

		//shift the assignments around
		this.operation = operation;
		this.previousOperand = this.currentOperand;
		this.currentOperand = "";
	}

	compute() {
		let result = undefined;
		// Convert the variables to a floating point number
		let prev = parseFloat(this.previousOperand);
		let curr = parseFloat(this.currentOperand);
		//if either are NaN break out
		if (isNaN(prev) || isNaN(curr)) return;

		switch (this.operation) {
			case "÷":
				result = prev / curr;
				break;
			case "*":
				result = prev * curr;
				break;
			case "-":
				result = prev - curr;
				break;
			case "+":
				result = prev + curr;
				break;
			default:
				return;
		}
		// Set the result to the current and reset the other parameters
		this.currentOperand = result;
		this.operation = undefined;
		this.previousOperand = "";
	}
	/**
	 *
	 * @param {number} number
	 * @description - Takes a number and converts the number to local formating.
	 */
	formatNumber(number) {
		/** Start by converting to a string */
		const stringNumbers = number.toString();
		/** Split the string at the decimal place */
		/** Grab the first index which will always be the integers convert it to a number*/
		const integers = parseFloat(stringNumbers.split(".")[0]);
		/** grab the decimals but there is no reason to convert to a number */
		const decimals = stringNumbers.split(".")[1];

		let numberDisplay = null;

		/** If integers does not exist */
		if (isNaN(integers)) {
			numberDisplay = "";
		} else {
			/** format the display number to local and no fraction digits */
			numberDisplay = integers.toLocaleString("en", {
				maximumFractionDigits: 0,
			});
		}

		/** Check is decimals is empty */
		if (decimals != null) {
			/** If not return the formatted integers as a string */
			return `${numberDisplay}.${decimals}`;
		} else {
			return numberDisplay;
		}
	}
	update() {
		/** Make sure that the user has selected an operation */
		if (this.operation != null) {
			this.previousOperandTextElement.innerText = `${this.formatNumber(
				this.previousOperand
			)} ${this.operation}`;
		} else {
			// This else clears the prevOperand if an operation exists
			// This allows chaining.
			this.previousOperandTextElement.innerText = "";
		}

		this.currentOperandTextElement.innerText = this.formatNumber(
			this.currentOperand
		);
	}
}

export { Calculator };
