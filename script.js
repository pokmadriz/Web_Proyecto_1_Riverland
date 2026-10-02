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


/* Menú desplegable responsive */
function initMenu() {
  const btn = document.querySelector(".nav-toggle");
  const nav = document.getElementById("menu");
  const cerrar = () => {
    nav.classList.remove("is-open");
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-label", "Abrir menú");
  };
  btn.addEventListener("click", () => {
    const abierto = nav.classList.toggle("is-open");
    btn.setAttribute("aria-expanded", String(abierto));
    btn.setAttribute("aria-label", abierto ? "Cerrar menú" : "Abrir menú");
  });
  nav.querySelectorAll("a").forEach(a => a.addEventListener("click", cerrar));
  document.addEventListener("keydown", e => { if (e.key === "Escape") cerrar(); });
  window.addEventListener("resize", () => { if (window.innerWidth > 900) cerrar(); });
}

/* Pestañas del programa */
function initTabs() {
  const tabs = [...document.querySelectorAll(".tab")];
  const lista = document.getElementById("panel-0");
  const pintar = dia => {
    lista.innerHTML = "";
    PROGRAMA[dia].forEach(nombre => {
      const li = document.createElement("li");
      const b = document.createElement("button");
      b.type = "button";
      b.className = "artist";
      b.textContent = nombre;
      b.dataset.dia = dia;
      li.appendChild(b);
      lista.appendChild(li);
    });
    lista.setAttribute("aria-labelledby", "tab-" + dia);
  };
  tabs.forEach(t => t.addEventListener("click", () => {
    tabs.forEach(o => {
      const activa = o === t;
      o.classList.toggle("is-active", activa);
      o.setAttribute("aria-selected", String(activa));
      o.tabIndex = activa ? 0 : -1;
    });
    pintar(Number(t.dataset.day));
  }));
  lista.addEventListener("click", e => {
    const b = e.target.closest(".artist");
    if (!b) return;
    document.getElementById("m-artista-titulo").textContent = b.textContent;
    document.getElementById("m-artista-info").textContent =
      "Actúa el " + DIAS[b.dataset.dia] + " de agosto en Riverland Fest 2026, Valle de la Música (Arriondas).";
    document.getElementById("modal-artista").showModal();
  });
  pintar(0);
}

/* Ventanas modales y calculadora de entradas */
function initModales() {
  document.querySelectorAll(".modal").forEach(m => {
    m.querySelectorAll(".modal-close").forEach(b => b.addEventListener("click", () => m.close()));
    m.addEventListener("click", e => { if (e.target === m) m.close(); }); // clic en el fondo
  });
  const modal = document.getElementById("modal-entradas");
  const cantidad = document.getElementById("cantidad");
  const total = document.getElementById("m-entradas-total");
  let precio = 0;
  const calcular = () => {
    const n = Math.min(10, Math.max(1, parseInt(cantidad.value, 10) || 1));
    total.textContent = (n * precio).toLocaleString("es-ES") + " €";
  };
  document.querySelectorAll(".buy").forEach(b => b.addEventListener("click", () => {
    precio = Number(b.dataset.price);
    document.getElementById("m-entradas-tipo").textContent = b.dataset.ticket + " · " + precio + " € por entrada";
    cantidad.value = 1;
    calcular();
    modal.showModal();
  }));
  cantidad.addEventListener("input", calcular);
}
