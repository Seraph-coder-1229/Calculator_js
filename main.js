/** @see module: src/calculator */
import { Calculator } from "./src/calculator.js";

/**
 * @constant
 * @type {HTMLDivElement} prevOperand
 */
const prevOperand = document.querySelector("[data-previous-operand]");
console.log(prevOperand.innerHTML);
/**
 * @constant
 * @type {HTMLDivElement} currOperand
 */
const currOperand = document.querySelector("[data-current-operand]");

/** Instantiate a new Calculator */
const calculator = new Calculator(prevOperand, currOperand);

/******************************************************************/

/**
 * Number Buttons
 * @constant numberButtons
 * @type {Array <HTMLButtonElement>}
 * @description An array of button elements. Value is the innerHTML
 */

const numberButtons = document.querySelectorAll("[data-number]");

numberButtons.forEach((button) =>
	button.addEventListener("click", (e) => {
		e.preventDefault();
		calculator.appendNumber(button.innerHTML);
		calculator.update();
	})
);

const operationButtons = document.querySelectorAll("[data-operation]");

operationButtons.forEach((button) => {
	button.addEventListener("click", (e) => {
		e.preventDefault();
		calculator.chooseOperation(button.innerText);
		calculator.update();
	});
});

const equalsButton = document.querySelector("[data-equals]");

equalsButton.addEventListener("click", (e) => {
	e.preventDefault();
	calculator.compute();
	calculator.update();
});

const allClearButton = document.querySelector("[data-clear]");

allClearButton.addEventListener("click", (e) => {
	e.preventDefault();
	calculator.clear();
	calculator.update();
});

const deleteButton = document.querySelector("[data-delete]");

deleteButton.addEventListener("click", (e) => {
	e.preventDefault();
	calculator.delete();
	calculator.update();
});
