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
    if(b == 0){
        outputArea.textContent = "lol you can't do that";
        return 0;
    } else {
        return a / b;
    }
}

const operators = ["add", "subtract", "multiply", "divide"];

function operate(num1, num2, operator){
    if (!operators.includes(operator)){
        return "Error, not an operator"
    } else {
        outputArea.textContent = window[operator](num1, num2);
        let answer = window[operator](num1, num2);
        
        return answer;
    }
}

// display updating
function updateDisplay(button){
    if(outputArea.textContent == ""){
        outputArea.textContent = button.textContent;
        outputArea.value = button.textContent;
        // let currentValue = parseFloat(button.textContent);
        // console.log(currentValue);
    } else {
        outputArea.textContent = outputArea.textContent + button.textContent;
        outputArea.value = outputArea.value + button.textContent;
        
        // let currentValue = parseFloat(button.textContent) + parseFloat(outputArea.textContent);
        // console.log(currentValue);
    }
    
}

// clear display
function clearDisplay(){
    outputArea.textContent = '';
    outputArea.value = '';
}

function postCalcValueShift(answer){
    val1[0] = answer;
    val2.pop();
    opVal.pop();
}
// console.log(operators["add"]);
// console.log(operate(1,2,"add"));

const outputArea = document.querySelector("#output");
const acButton = document.querySelector("#AC");
const plusminusButton = document.querySelector("#plusminus");
const percentButton = document.querySelector("#percent");
const divideButton = document.querySelector("#divide");
const sevenButton = document.querySelector("#seven");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector("#operate");

acButton.addEventListener("click", function memClear() {
    val1.pop() && val2.pop() && opVal.pop();
    clearDisplay();
});

let val1 = [];
let val2 = [];
let opVal = [];
numberButtons.forEach((b) => b.addEventListener("click", () => updateDisplay(b)));
operatorButtons.forEach((b) => b.addEventListener("click", function captureVal(){
    opVal.push(b.id);
    console.log(opVal);
    if (val1 == ''){
        val1.push(parseFloat(outputArea.value));
        console.log(val1);
        
    }
    clearDisplay();
}))

equalsButton.addEventListener("click", function calc(){
    if (val2 == ''){
        val2.push(parseFloat(outputArea.value));
        console.log(val2);
    }

    if (val1.length > 0 && val2.length > 0 && opVal.length > 0){
        operate(val1[0],val2[0],opVal[0]);
        const answer = operate(val1[0],val2[0],opVal[0]);
        console.log("answer: ", answer);
        postCalcValueShift(answer);
    } else {
        outputArea.textContent = val1[0];
    }
})