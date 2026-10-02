"use strict";

/* Programa: artistas confirmados por día (fuente: prensa; verifica en la web oficial) */
const PROGRAMA = [
  ["Sticky M.A.", "Six Sex", "Raly", "L'Haïne", "Selecta"],
  ["Natalia Lacunza", "Vreno YG", "Ralphie Choo", "Mvrk", "Juicy Bae", "Taichu", "Soto Asa", "Skinyz"],
  ["Akriila", "Abhir", "Hoke", "Metrika", "Zell", "La Musa", "Bea Pelea"]
];
const DIAS = ["viernes 21", "sábado 22", "domingo 23"];

document.addEventListener("DOMContentLoaded", () => {
  initMenu();
  initTabs();
  initModales();
  initForm();
  initReveal();
});

