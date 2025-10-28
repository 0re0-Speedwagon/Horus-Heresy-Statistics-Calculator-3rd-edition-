const A_Legion = document.getElementById("A_Legion");
const D_Legion = document.getElementById("D_Legion");
const attacker = document.getElementById("attacker");
const defender = document.getElementById("defender");
const reset = document.getElementById("reset");
const generate = document.getElementById("generate");

reset.addEventListener("click", function () {
  console.log("reset!");
  A_Legion.value = "start";
  D_Legion.value = "start";
  attacker.value = "start";
  defender.value = "start";
});
A_Legion.addEventListener("change", function () {
  console.log(A_Legion.value);
});
attacker.addEventListener("change", function () {
  console.log(attacker.value);
});
D_Legion.addEventListener("change", function () {
  console.log(D_Legion.value);
});
defender.addEventListener("change", function () {
  console.log(defender.value);
});
