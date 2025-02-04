function add(num){
   return num.reduce((acc, curr) => acc + curr);
}

function subtract(num){
    return num.reduce((acc, curr) => acc - curr);
}

function multiply(num){
    return num.reduce((acc, curr) => acc * curr);
}

function divide(num){
    return num.reduce((acc, curr) => acc / curr);
}

console.log(divide([5,3,1.667]));