// ─── Category → CSS var map ───────────────────────────────────
const catCSSVar = {
  "alkali metal": "--alkali-metal",
  "alkaline earth metal": "--alkaline-earth-metal",
  "transition metal": "--transition-metal",
  metalloid: "--metalloid",
  "post-transition metal": "--post-transition-metal",
  "polyatomic nonmetal": "--polyatomic-nonmetal",
  "diatomic nonmetal": "--diatomic-nonmetal",
  "noble gas": "--noble-gas",
  lanthanide: "--lanthanide",
  actinide: "--actinide",
};

function getCatClass(cat) {
  if (!cat) return "cat-unknown";
  return "cat-" + cat.toLowerCase().replaceAll(" ", "-");
}

// ─── Shared filter ────────────────────────────────────────────
function applyFilter(sel) {
  document.querySelectorAll(".element").forEach((el) => {
    el.classList.toggle("dimmed", sel !== "all" && el.dataset.category !== sel);
  });
}

// ─── Desktop dropdown filter ──────────────────────────────────
function setupDropdownFilter() {
  const dropdown = document.querySelector(".nav-dropdown");
  const trigger = document.querySelector(".nav-dropdown-trigger");
  if (!dropdown || !trigger) return;

  trigger.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdown.classList.toggle("open");
  });
  document.addEventListener("click", () => dropdown.classList.remove("open"));

  document.querySelectorAll(".nav-dropdown-menu button").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      document
        .querySelectorAll(".nav-dropdown-menu button")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      dropdown.classList.remove("open");
      applyFilter(btn.dataset.category);
    });
  });
}

// ─── Mobile select filter ─────────────────────────────────────
function setupMobileFilter() {
  const sel = document.getElementById("mobileFilterSelect");
  if (!sel) return;
  sel.addEventListener("change", () => applyFilter(sel.value));
}

// ─── Build table ─────────────────────────────────────────────
function buildTable(elements) {
  const table = document.getElementById("table");
  if (!table) return;
  table.innerHTML = "";

  // Placeholders
  const lp = document.createElement("div");
  lp.className = "lanthanide-placeholder";
  lp.style.cssText = "grid-column:3;grid-row:6";
  lp.innerHTML = "Lanthanide<br>57–71";
  table.appendChild(lp);

  const ap = document.createElement("div");
  ap.className = "actinide-placeholder";
  ap.style.cssText = "grid-column:3;grid-row:7";
  ap.innerHTML = "Actinide<br>89–103";
  table.appendChild(ap);

  elements.forEach((el) => {
    if (!el.xpos || !el.ypos) return;
    const box = document.createElement("div");
    box.className = "element " + getCatClass(el.category);
    box.dataset.category = el.category
      ? el.category.toLowerCase().replaceAll(" ", "-")
      : "unknown";
    box.style.cssText = `grid-column:${el.xpos};grid-row:${el.ypos}`;
    box.innerHTML = `
      <span class="el-number">${el.number}</span>
      <span class="el-symbol">${el.symbol}</span>
      <span class="el-name">${el.name}</span>
      <span class="el-mass">${parseFloat(el.atomic_mass).toFixed(2)}</span>`;
    box.addEventListener("click", () => openModal(el));
    table.appendChild(box);
  });

  // Wire up filters AFTER elements exist in DOM
  setupDropdownFilter();
  setupMobileFilter();
}

// ─── Tablet scale ─────────────────────────────────────────────
// Grid natural width: 18×56 + 17×4 = 1076px
const GRID_W = 1076;

function updateTableScale() {
  const vw = window.innerWidth;
  if (vw > 1200 || vw <= 640) {
    document.documentElement.style.removeProperty("--table-scale");
    return;
  }
  const scale = Math.min(1, (vw - 32) / GRID_W);
  document.documentElement.style.setProperty("--table-scale", scale.toFixed(4));
}
window.addEventListener("resize", updateTableScale);
updateTableScale();

// ─── Modal DOM (created once) ─────────────────────────────────
function createModalDOM() {
  const overlay = document.createElement("div");
  overlay.className = "modal-overlay";
  overlay.id = "el-modal-overlay";
  overlay.innerHTML = `
    <div class="modal-card" id="el-modal-card">
      <div class="modal-hero" id="m-hero">
        <div class="modal-symbol-box">
          <span class="msb-num" id="m-num"></span>
          <span class="msb-sym" id="m-sym"></span>
          <span class="msb-mass" id="m-mass"></span>
        </div>
        <div class="modal-title-block">
          <div class="modal-el-name" id="m-name"></div>
          <div class="modal-badges" id="m-badges"></div>
          <div class="modal-summary" id="m-summary"></div>
        </div>
        <button class="modal-close" id="m-close" aria-label="Close">✕</button>
      </div>
      <div id="m-spectral-wrap"></div>
      <div class="modal-stats" id="m-stats"></div>
      <div class="modal-bottom">
        <div>
          <div class="modal-row-label">Electron Configuration</div>
          <div class="modal-econfig" id="m-econfig"></div>
        </div>
        <div>
          <div class="modal-row-label">Shell Distribution</div>
          <div class="modal-shell-row" id="m-shells"></div>
        </div>
      </div>
      <div class="modal-footer">
        <div class="modal-discoverer">
          <span class="disc-label">Discovered by</span>
          <span class="disc-name" id="m-discoverer"></span>
        </div>
        <a class="modal-wiki" id="m-wiki" href="#" target="_blank" rel="noopener">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
          Read on Wikipedia
        </a>
      </div>
    </div>`;
  document.body.appendChild(overlay);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });
  document.getElementById("m-close").addEventListener("click", closeModal);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
}

function fmt(val, unit = "", fallback = "—") {
  if (val == null) return fallback;
  return (
    parseFloat(val).toLocaleString(undefined, { maximumFractionDigits: 3 }) +
    unit
  );
}
function resolveColor(cat) {
  const v = catCSSVar[cat?.toLowerCase() || ""];
  if (!v) return "var(--accent)";
  return (
    getComputedStyle(document.documentElement).getPropertyValue(v).trim() ||
    "var(--accent)"
  );
}

function openModal(el) {
  const card = document.getElementById("el-modal-card");
  const color = resolveColor(el.category);
  card.style.setProperty("--modal-color", color);
  card.style.setProperty(
    "--modal-glow",
    `color-mix(in srgb,${color} 18%,transparent)`,
  );

  document.getElementById("m-num").textContent = el.number;
  document.getElementById("m-sym").textContent = el.symbol;
  document.getElementById("m-mass").textContent =
    parseFloat(el.atomic_mass).toFixed(4) + " u";
  document.getElementById("m-name").textContent = el.name;
  document.getElementById("m-badges").innerHTML = `
    <span class="modal-badge"><span class="badge-dot"></span>${el.category}</span>
    ${el.phase ? `<span class="modal-badge neutral">${el.phase}</span>` : ""}
    ${el.period ? `<span class="modal-badge neutral">Period ${el.period}</span>` : ""}`;
  document.getElementById("m-summary").textContent =
    el.summary || "No summary available.";

  const sw = document.getElementById("m-spectral-wrap");
  sw.innerHTML = el.spectral_img
    ? `<img class="modal-spectral" src="${el.spectral_img}" alt="${el.name} spectral lines" loading="lazy" onerror="this.outerHTML='<div class=\\'modal-no-spectral\\'>No spectral data</div>'">`
    : `<div class="modal-no-spectral">No spectral data available</div>`;

  document.getElementById("m-stats").innerHTML = [
    { label: "Density", value: fmt(el.density, " g/cm³") },
    { label: "Melt Point", value: el.melt != null ? fmt(el.melt, " K") : "—" },
    { label: "Boil Point", value: el.boil != null ? fmt(el.boil, " K") : "—" },
    { label: "Molar Heat", value: fmt(el.molar_heat, " J/mol·K") },
    { label: "Electronegativity", value: fmt(el.electronegativity_pauling) },
    {
      label: "Electron Affinity",
      value:
        el.electron_affinity != null
          ? fmt(el.electron_affinity, " kJ/mol")
          : "—",
    },
    {
      label: "1st Ionization",
      value: el.ionization_energies?.[0]
        ? `${el.ionization_energies[0]} kJ/mol`
        : "—",
    },
    { label: "Appearance", value: el.appearance || "—" },
    { label: "CPK Color", value: el["cpk-hex"] ? `#${el["cpk-hex"]}` : "—" },
  ]
    .map(
      ({ label, value }) =>
        `<div class="stat-tile"><span class="st-label">${label}</span><span class="st-value">${value}</span></div>`,
    )
    .join("");

  document.getElementById("m-econfig").textContent =
    el.electron_configuration_semantic || el.electron_configuration || "—";

  const shellsEl = document.getElementById("m-shells");
  shellsEl.innerHTML = el.shells?.length
    ? el.shells
        .map(
          (n, i) => `
        ${i > 0 ? '<span class="shell-sep"></span>' : ""}
        <div class="shell-ring">
          <span class="shell-ring-num">${i + 1}</span>
          <div class="shell-pip-wrap">
            ${Array.from({ length: Math.min(n, 18) }, () => '<span class="shell-pip"></span>').join("")}
            ${n > 18 ? `<span style="font-size:0.5rem;color:var(--text-secondary)">+${n - 18}</span>` : ""}
          </div>
        </div>`,
        )
        .join("")
    : `<span style="font-size:0.72rem;color:var(--text-secondary)">—</span>`;

  document.getElementById("m-discoverer").textContent =
    el.discovered_by || "Unknown";
  const wiki = document.getElementById("m-wiki");
  if (el.source) {
    wiki.href = el.source;
    wiki.style.display = "inline-flex";
  } else wiki.style.display = "none";

  document.getElementById("el-modal-overlay").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  document.getElementById("el-modal-overlay").classList.remove("open");
  document.body.style.overflow = "";
}

// ─── Init ─────────────────────────────────────────────────────
createModalDOM();
fetch("/data/element.json")
  .then((r) => r.json())
  .then((data) => buildTable(data.elements || data))
  .catch((err) => console.error("Failed to load elements:", err));
