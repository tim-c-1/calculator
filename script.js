function add(a, b){
   return a+b;
}

function subtract(a, b){
    return a-b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    return a / b;
}

// const operator = ["add", "subtract", "divide",];


const operators = ["add", "subtract", "multiply", "divide"];

function operate(num1, num2, operator){
    if (!operators.includes(operator)){
        return "Error, not an operator"
    } else {
        return window[operator](num1, num2);
    }
}
// console.log(operators["add"]);
console.log(operate(1,2,"add"));

const outputArea = document.querySelector("#output");
const acButton = document.querySelector("#AC");
const plusminusButton = document.querySelector("#plusminus");
const percentButton = document.querySelector("#percent");
const divideButton = document.querySelector("#divide");
const sevenButton = document.querySelector("#seven");
const numberButtons = document.querySelectorAll(".number");

acButton.addEventListener("click", () => outputArea.textContent ='');
numberButtons.forEach((b) => {b.addEventListener("click", () => outputArea.textContent = b.textContent)});