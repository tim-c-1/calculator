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
    // operatorPressCount = 0;
    // console.log("presscount: ", operatorPressCount);
    if (!operators.includes(operator)){
        return "Error, not an operator"
    } else {
        
        let answer = window[operator](num1, num2);
        ans = Math.round(answer * 1000) / 1000;
        val1 = [ans];
        workingValue = ans;
        val2.pop();
        
        outputArea.textContent = ans;
        calcCount++;
        buttonPressCount = 0;
        // operatorPressCount = 0; //clear operator count to restart cycle - dont think we need this.
        return ans;
    }
}

// display updating
function updateDisplay(value){
    if(outputArea.textContent == ""){
        
        outputArea.textContent = value;
        // workingValue = parseFloat(value);
        
    } else {
        
        outputArea.textContent += value;
        
        // hold workingValue as string and concat new inputs until a float is able to be parsed.
        // workingValue += String(value);
        // if (workingValue.includes(".")){
        //     if (workingValue.split(".")[1] != '' && value != 0){
        //         workingValue = parseFloat(workingValue);
        //     }
        // } else {
        //     workingValue = parseFloat(workingValue);
        // }
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
function numberEntry(b) {
    console.log("buttonPressCount: ", buttonPressCount); 
    if (operatorPressCount > 0 && !buttonPressCount > 0){
        clearDisplay();
        console.log("cleared display");
        workingValue = '';
        buttonPressCount++; //only calls once until cleared by ac or operate.
        // console.log("working val = ", workingValue);
        // operatorPressCount = 0;
        // console.log("presscount: ", operatorPressCount);
    }
    if(outputArea.textContent == ""){
        
        if (b != "."){
            workingValue = parseFloat(b);
        } else {
            workingValue += String(b);
        }
        
    } else {
        workingValue += String(b);
            if (workingValue.includes(".")){
                if (workingValue.split(".")[1] != '' && b != 0){
                    workingValue = parseFloat(workingValue);
                }
            } else if (workingValue != "."){ //dont parsefloat until there's something other than a period
                workingValue = parseFloat(workingValue);
            }
        }
    if (!outputArea.textContent.includes(".") || b != "."){
        updateDisplay(b);
    }
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
    workingValue = '';
    calcCount = 0;
    buttonPressCount = 0;
    clearDisplay();
});

let val1 = [];
let val2 = [];
let opVal = [];
let workingValue = '';
let operatorPressCount = 0;
let calcCount = 0;
let buttonPressCount = 0;
const numeric = [1,2,3,4,5,6,7,8,9,0];

numberButtons.forEach((b) => b.addEventListener("click", function buttonPress(){
  numberEntry(b.textContent);
}));
operatorButtons.forEach((b) => b.addEventListener("click", function captureVal(){
    
    // is it the first time to select? write to value 1
    if (operatorPressCount == 0 && val1 == ''){
        val1.push(workingValue);
    }

    //is it not the first time to select? write to value 2, value 1 has been rewritten with the previous answer
    if (operatorPressCount >= 1 && buttonPressCount > 0){
        val2.push(workingValue);
    }

    // if (val1.length > 0 && operatorPressCount == 1){
    //     val2.push(workingValue);
    //     console.log("pushed working value to val2");
    // } else if(val1.length > 0 && operatorPressCount > 0){
        
    // }
    operatorPressCount++;
    console.log("operatorPressCount: ", operatorPressCount);

    if (val1.length > 0 && val2.length > 0 && opVal.length > 0){
        // operate(val1[0], val2[0], opVal[0]);
        const answer = operate(val1[0],val2[0],opVal[0]);
        console.log("answer: ", answer);
        // postCalcValueShift(answer);
        // operatorPressCount++;
        console.log("calc'd.");
    }

    opVal.pop();
    opVal.push(b.id);
    console.log(opVal);
    
    // if (val1 == ''){
    //     val1.push(parseFloat(workingValue));
    //     console.log(val1);
        
    // }
    // clearDisplay(); //possibly change this to capture val in var, wait to clear until operate?
    // outputArea.textContent = val1[0];
    
}))

equalsButton.addEventListener("click", function calc(){
    console.log("operatorPressCount at equals: ", operatorPressCount);
    if (operatorPressCount >= 1){
        val2.push(workingValue);
    }


    // if (val2 == ''){
    //     val2.push(parseFloat(workingValue));
    //     console.log(val2);
    // }

    if (val1.length > 0 && val2.length > 0 && opVal.length > 0){
        // operate(val1[0],val2[0],opVal[0]);
        const answer = operate(val1[0],val2[0],opVal[0]);
        console.log("answer: ", answer);
        // postCalcValueShift(answer);
        // operatorPressCount = 0;
        console.log("operatorPressCount: ", operatorPressCount);
    } else {
        outputArea.textContent = workingValue;
    }
    operatorPressCount = 0;
})

percentButton.addEventListener("click", function percent(){
    workingValue = workingValue / 100;
    outputArea.textContent = (parseFloat(outputArea.textContent) / 100);
})

document.addEventListener("keydown", (k) => {
    if (numeric.includes(parseInt(k.key))){
        console.log(k.key);
        numberEntry(k.key);
    }
})

//** 
// select numbers -> write to working value *
// select operator for first time -> write working value to value 1 *
// select next numbers -> clear display & write to working value -> update display *
// select operator for second time OR select equals button -> write working value to value 2 -> operate *
// select operator for first time -> write answer to value 1
// select next numbers -> write to working value
// select operator OR equals -> write working value to value 2 -> operate
//  */ 