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
    operatorPressCount = 0;
    console.log("presscount: ", operatorPressCount);
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
        workingValue = parseFloat(button.textContent);
        
    } else {
        
        outputArea.textContent += button.textContent;
        
        // hold workingValue as string and concat new inputs until a float is able to be parsed.
        workingValue += String(button.textContent);
        if (workingValue.includes(".")){
            if (workingValue.split(".")[1] != '' && button.textContent != 0){
                workingValue = parseFloat(workingValue);
            }
        } else {
            workingValue = parseFloat(workingValue);
        }
    }
    
}

// clear display
function clearDisplay(){
    outputArea.textContent = '';
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
    operatorPressCount = 0;
    console.log("presscount: ", operatorPressCount);
    workingValue = '';
    clearDisplay();
});

let val1 = [];
let val2 = [];
let opVal = [];
let workingValue = '';
let operatorPressCount = 0;

numberButtons.forEach((b) => b.addEventListener("click", function buttonPress(){ 
    if (operatorPressCount == 1){
        clearDisplay();
        console.log("cleared display");
        console.log("working val = ", workingValue);
        operatorPressCount = 0;
        console.log("presscount: ", operatorPressCount);
    }
    updateDisplay(b);
}));
operatorButtons.forEach((b) => b.addEventListener("click", function captureVal(){
    operatorPressCount++;
    console.log("presscount: ", operatorPressCount);
    if (val1.length > 0){
        val2.push(parseFloat(workingValue));
    }
    if (val1.length > 0 && val2.length > 0 && opVal.length > 0){
        operate(val1[0], val2[0], opVal[0]);
        const answer = operate(val1[0],val2[0],opVal[0]);
        console.log("answer: ", answer);
        postCalcValueShift(answer);
        operatorPressCount++;
        console.log("presscount: ", operatorPressCount);
    }
    opVal.push(b.id);
    console.log(opVal);
    if (val1 == ''){
        val1.push(parseFloat(workingValue));
        console.log(val1);
        
    }
    // clearDisplay(); //possibly change this to capture val in var, wait to clear until operate?
    // outputArea.textContent = val1[0];
}))

equalsButton.addEventListener("click", function calc(){
    if (val2 == ''){
        val2.push(parseFloat(workingValue));
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