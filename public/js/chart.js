let chart,
  allElements = [],
  currentProperty = "electronegativity",
  currentPeriod = "all";

const properties = {
  electronegativity: {
    key: "electronegativity_pauling",
    label: "Electronegativity",
    chartLabel: "Electronegativity (Pauling)",
    yLabel: "Electronegativity",
    min: 0,
    max: 5,
    borderColor: "#6c63ff",
    gradientTop: "rgba(108,99,255,0.2)",
    gradientBottom: "rgba(108,99,255,0)",
    eyebrow: "Electronegativity · Pauling Scale",
    subText:
      "Visualise how electronegativity shifts across periods and groups using the Pauling scale.",
    cards: [
      {
        title: "What is Electronegativity?",
        text: `A measure of an atom's tendency to attract electrons in a bond, rated on the <span class="hi">Pauling scale</span>.`,
      },
      {
        title: "Across a Period",
        text: `Electronegativity <span class="hi">increases left → right</span> because nuclear charge rises.`,
      },
      {
        title: "Down a Group",
        text: `It <span class="hi">decreases top → bottom</span> because shielding increases.`,
      },
      {
        title: "Most Electronegative",
        text: `<span class="hi">Fluorine (F)</span> is the most electronegative element.`,
      },
    ],
  },
  ionization: {
    key: "ionization_energies",
    label: "Ionization Energy",
    chartLabel: "Ionization Energy (kJ/mol)",
    yLabel: "Ionization Energy",
    min: 0,
    max: 2500,
    borderColor: "#38bdf8",
    gradientTop: "rgba(56,189,248,0.2)",
    gradientBottom: "rgba(56,189,248,0)",
    eyebrow: "Ionization Energy · kJ/mol",
    subText: "Explore how ionization energy changes across periods and groups.",
    cards: [
      {
        title: "What is Ionization Energy?",
        text: `The energy needed to <span class="hi">remove an electron</span> from a gaseous atom.`,
      },
      {
        title: "Across a Period",
        text: `Ionization energy generally <span class="hi">increases left → right</span>.`,
      },
      {
        title: "Down a Group",
        text: `It <span class="hi">decreases top → bottom</span> because outer electrons are farther away.`,
      },
      {
        title: "Highest Ionization Energy",
        text: `<span class="hi">Helium (He)</span> has one of the highest ionization energies.`,
      },
    ],
  },
};

const propertyDropdown = document.getElementById("propertyDropdown");
const periodDropdown = document.getElementById("periodDropdown");

document
  .getElementById("propertyTrigger")
  .addEventListener("click", function (e) {
    e.stopPropagation();
    propertyDropdown.classList.toggle("open");
    periodDropdown.classList.remove("open");
  });
document
  .getElementById("periodTrigger")
  .addEventListener("click", function (e) {
    e.stopPropagation();
    periodDropdown.classList.toggle("open");
    propertyDropdown.classList.remove("open");
  });
document.addEventListener("click", function () {
  propertyDropdown.classList.remove("open");
  periodDropdown.classList.remove("open");
});

document.querySelectorAll("[data-property]").forEach(function (btn) {
  btn.addEventListener("click", function () {
    document
      .querySelectorAll("[data-property]")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentProperty = btn.dataset.property;
    propertyDropdown.classList.remove("open");
    renderChart();
  });
});

document.querySelectorAll("[data-period]").forEach(function (btn) {
  btn.addEventListener("click", function () {
    document
      .querySelectorAll("[data-period]")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentPeriod = btn.dataset.period;
    document.getElementById("periodLabel").textContent = btn.textContent.trim();
    periodDropdown.classList.remove("open");
    renderChart();
  });
});

function getValue(el, key) {
  if (key === "ionization_energies")
    return Array.isArray(el.ionization_energies) &&
      el.ionization_energies.length > 0
      ? el.ionization_energies[0]
      : null;
  return el[key];
}

function getPointColor(v) {
  if (currentProperty === "electronegativity")
    return v >= 3.5 ? "#f472b6" : v >= 2.5 ? "#38bdf8" : "#a09aff";
  return v >= 2000 ? "#f472b6" : v >= 1200 ? "#38bdf8" : "#7dd3fc";
}

function renderCards() {
  document.getElementById("infoGrid").innerHTML = properties[
    currentProperty
  ].cards
    .map(
      (c) =>
        `<div class="info-card"><span class="card-title">${c.title}</span><p class="card-body">${c.text}</p></div>`,
    )
    .join("");
}

function renderChart() {
  const d = properties[currentProperty];
  const els = allElements.filter((e) => {
    const v = getValue(e, d.key);
    return currentPeriod === "all"
      ? v != null
      : v != null && e.period == currentPeriod;
  });
  const labels = els.map((e) => e.symbol);
  const values = els.map((e) => getValue(e, d.key));
  if (chart) chart.destroy();
  chart = new Chart(document.getElementById("enChart"), {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: d.chartLabel,
          data: values,
          borderColor: d.borderColor,
          backgroundColor: (ctx) => {
            const g = ctx.chart.ctx.createLinearGradient(0, 0, 0, 350);
            g.addColorStop(0, d.gradientTop);
            g.addColorStop(1, d.gradientBottom);
            return g;
          },
          pointBackgroundColor: values.map(getPointColor),
          pointBorderColor: "#0b1120",
          pointBorderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 7,
          borderWidth: 2,
          tension: 0.4,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "index", intersect: false },
      animations: {
        tension: {
          duration: 1000,
          easing: "linear",
          from: 1,
          to: 0,
          loop: true,
        },
      },
      plugins: {
        title: {
          display: true,
          text: d.chartLabel + " vs Element",
          color: "#94a3b8",
          font: { family: "DM Sans", size: 16, weight: "500" },
          padding: { bottom: 20 },
        },
        legend: {
          labels: {
            color: "#94a3b8",
            font: { family: "DM Sans", size: 14 },
            padding: 12,
          },
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "Chemical Elements",
            color: "#94a3b8",
            padding: { top: 18 },
            font: { family: "DM Sans", size: 14 },
          },
          ticks: { color: "#475569" },
          grid: { color: "rgba(255,255,255,0.05)" },
        },
        y: {
          title: {
            display: true,
            text: d.yLabel,
            color: "#94a3b8",
            padding: { bottom: 18 },
            font: { family: "DM Sans", size: 14 },
          },
          min: d.min,
          max: d.max,
          ticks: { color: "#475569" },
          grid: { color: "rgba(255,255,255,0.05)" },
        },
      },
    },
  });
  document.getElementById("eyebrowText").textContent = d.eyebrow;
  document.getElementById("pageSub").textContent = d.subText;
  document.getElementById("propertyLabel").textContent = d.label;
  renderCards();
}

fetch("/data/element.json")
  .then((r) => r.json())
  .then((data) => {
    allElements = data.elements;
    renderChart();
  });
