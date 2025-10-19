/**
 * Rezeptanzeige – schlank, sicher, steuerbar
 * - Rendering per innerHTML (mit Escaping)
 * - Dark-Mode folgt System, Button überschreibt (light/dark/system)
 */

const BASE_SERVINGS = 4;
let ingredients = [];
let instructions = [];
/* ========== Theme / Dark-Mode ========== */
const THEME_KEY = "recipe_theme"; // 'light' | 'dark'

function applyTheme(theme) {
  const b = document.body;
  if (theme === "dark") {
    b.setAttribute("data-theme", "dark");
  } else {
    b.setAttribute("data-theme", "light");
  }

  const btn = document.getElementById("themeToggleBtn");
  if (!btn) return;
  const label =
    theme === "dark" ? "Theme: Dunkel"
    : "Theme: Hell";
  btn.textContent = label;
}

function loadTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === "dark" || saved === "light") return saved;
  return "light"; // Default to light
}

function toggleTheme() {
  const current = loadTheme();
  const next = current === "dark" ? "light" : "dark";

  localStorage.setItem(THEME_KEY, next);
  applyTheme(next);
}

/* ========== Utils ========== */
// HTML escapen
const esc = (s) =>
  String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

// hübsche Zahl
const nice = (val, maxDecimals = 2) => {
  const p = 10 ** maxDecimals;
  const r = Math.round(val * p) / p;
  return Number.isInteger(r) ? String(r) : String(Number(r.toFixed(maxDecimals)));
};

const normUnit = (u) => (u || "").toLowerCase().trim();
const pluralize = (unit, val) => {
  const u = normUnit(unit);
  const one = Number(val) === 1;
  if (u === "prise") return one ? "Prise" : "Prisen";
  if (u === "stück") return "Stück";
  if (["ml","g","kg","tl","el"].includes(u)) return unit; // Abkürzungen bleiben
  return unit || "";
};

const scaleAmount = (menge, unit, factor) => {
  let val = menge * factor;
  const u = normUnit(unit);

  if (u === "stück" || u === "prise") {
    val = Math.max(1, Math.round(val));
    return { value: String(val), unit: pluralize(unit, val) };
  }
  if (u === "ml" || u === "g") {
    return { value: nice(val, 1), unit };
  }
  if (u === "kg") {
    if (val < 1) return { value: nice(val * 1000, 0), unit: "g" };
    return { value: nice(val, 2), unit };
  }
  return { value: nice(val, 2), unit: unit || "" };
};

/* ========== Rendering ========== */
function render(servings) {
  const factor = Math.max(1, servings) / BASE_SERVINGS;

  const zutatenHTML = `
    <h2>Zutaten</h2>
    <ul class="zutatenListe">
      ${ingredients.map((z, i) => {
        const scaled = scaleAmount(z.menge, z.einheit, factor);
        return `
          <li id="ListItem${i + 1}">
            <span class="amount">${esc(scaled.value)} ${esc(scaled.unit)}</span>
            <span class="title"> ${esc(z.title)}</span>
          </li>
        `;
      }).join("")}
    </ul>
  `;

  const zubereitungHTML = `
    <h2>Zubereitung</h2>
    <ol class="zubereitungListe">
      ${instructions.map((s) => `<li>${esc(s)}</li>`).join("")}
    </ol>
  `;

  document.getElementById("zutaten").innerHTML = zutatenHTML;
  document.getElementById("zubereitung").innerHTML = zubereitungHTML;
}

/* ========== Data & Events ========== */
async function loadData() {
  const res = await fetch("werte.json");
  const data = await res.json();
  ingredients = data.items ?? [];
  instructions = data.instructions ?? [];
  document.getElementById("rezeptTitel").textContent = data.title || "Sauerbraten";
  render(BASE_SERVINGS);
}

function getServingsFromInput() {
  const input = document.getElementById("AnzahlPersonen");
  const v = Math.floor(Number.parseFloat(input.value));
  return Number.isFinite(v) && v >= 1 ? v : BASE_SERVINGS;
}

document.addEventListener("DOMContentLoaded", () => {
  // Theme initialisieren
  applyTheme(loadTheme());
  document
    .getElementById("themeToggleBtn")
    .addEventListener("click", toggleTheme);

  // Daten & Portionen-Events
  loadData();

  const input = document.getElementById("AnzahlPersonen");
  const btn = document.getElementById("calculateButton");

  const update = () => {
    const s = getServingsFromInput();
    input.value = s;
    render(s);
  };

  btn.addEventListener("click", update);
  input.addEventListener("change", update);

  // Kompatibilität
  window.calculateFoodFunction = update;
});

function randomRecipe() {
    const pages = [
      "/recipeMemberOne/recipeMemberOne.html",
      "/recipeMemberTwo/recipeMemberTwo.html",
      "/recipeMemberThree/recipeMemberThree.html",
      "/extraRecipeOne/extraRecipeOne.html",
      "/extraRecipeTwo/extraRecipeTwo.html"
    ];

    const randomIndex = Math.floor(Math.random() * pages.length);
    const randomPage = pages[randomIndex];

    window.location.href = randomPage;
  }