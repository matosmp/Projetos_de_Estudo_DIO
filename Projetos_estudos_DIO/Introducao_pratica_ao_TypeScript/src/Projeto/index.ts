const input1 = document.getElementById("num1") as HTMLInputElement; // Tipando como elemento de entrada
const input2 = document.getElementById("num2") as HTMLInputElement;
const buttonSomar = document.getElementById("buttonSomar") as HTMLElement; // Tipado como elemento HTML
const buttonSubtrair = document.getElementById("buttonSubtrair") as HTMLElement;

function somar(a: number, b: number): number {
  return a + b;
}

buttonSomar.addEventListener("click", function () {
  const resultado = somar(Number(input1.value), Number(input2.value));
  console.log(resultado);
});

function subtrair(a: number, b: number): number {
  return a - b;
}

buttonSubtrair.addEventListener("click", function () {
  const resultado = subtrair(Number(input1.value), Number(input2.value));
  console.log(resultado);
});
