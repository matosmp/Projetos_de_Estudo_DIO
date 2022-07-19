"use strict";
const input1 = document.getElementById("num1"); // Tipando como elemento de entrada
const input2 = document.getElementById("num2");
const buttonSomar = document.getElementById("buttonSomar"); // Tipado como elemento HTML
const buttonSubtrair = document.getElementById("buttonSubtrair");
function somar(a, b) {
    return a + b;
}
buttonSomar.addEventListener("click", function () {
    const resultado = somar(Number(input1.value), Number(input2.value));
    console.log(resultado);
});
function subtrair(a, b) {
    return a - b;
}
buttonSubtrair.addEventListener("click", function () {
    const resultado = subtrair(Number(input1.value), Number(input2.value));
    console.log(resultado);
});
