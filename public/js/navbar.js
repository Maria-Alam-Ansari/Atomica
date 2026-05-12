/**
 * navbar.js — shared by all Atomica pages
 * Reads nav links BEFORE the media query hides them,
 * builds the hamburger button + mobile drawer, wires everything up.
 */
(function () {
  // Run immediately — DOM is ready because this script is at end of <body>
  var navbar = document.querySelector(".navbar");
  if (!navbar) return;

  // ── 1. Collect link data from <nav> before CSS hides anything ──
  // We read href, text, and active state from the actual anchor tags
  var navEl = navbar.querySelector("nav");
  if (!navEl) return;

  var linkData = [];
  navEl.querySelectorAll("a").forEach(function (a) {
    linkData.push({
      href: a.getAttribute("href") || "#",
      text: a.textContent.trim(),
      active: a.classList.contains("active"),
    });
  });

  // ── 2. Build hamburger button ──
  var burger = document.createElement("button");
  burger.className = "nav-hamburger";
  burger.setAttribute("aria-label", "Toggle menu");
  burger.setAttribute("aria-expanded", "false");
  burger.innerHTML = "<span></span><span></span><span></span>";
  navbar.appendChild(burger);

  // ── 3. Build drawer using the collected data (not DOM clones) ──
  var drawer = document.createElement("div");
  drawer.className = "nav-drawer";

  linkData.forEach(function (item) {
    var a = document.createElement("a");
    a.href = item.href;
    a.textContent = item.text;
    if (item.active) a.classList.add("active");
    drawer.appendChild(a);
  });

  document.body.appendChild(drawer);

  // ── 4. Toggle open/close ──
  function openDrawer() {
    drawer.classList.add("open");
    burger.classList.add("open");
    burger.setAttribute("aria-expanded", "true");
  }
  function closeDrawer() {
    drawer.classList.remove("open");
    burger.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
  }
  function isOpen() {
    return drawer.classList.contains("open");
  }

  burger.addEventListener("click", function (e) {
    e.stopPropagation();
    isOpen() ? closeDrawer() : openDrawer();
  });

  document.addEventListener("click", function (e) {
    if (isOpen() && !drawer.contains(e.target) && e.target !== burger) {
      closeDrawer();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeDrawer();
  });

  drawer.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", closeDrawer);
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 820) closeDrawer();
  });
})();
