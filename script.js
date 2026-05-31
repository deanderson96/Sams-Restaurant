// script.js
const body = document.body;
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".nav-links a");
const tabButtons = document.querySelectorAll(".tab-button");
const menuPanels = document.querySelectorAll(".menu-panel");
const menuSearch = document.querySelector("#menuSearch");
const noResults = document.querySelector(".no-results");
const year = document.querySelector("#year");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (navToggle) {
  navToggle.addEventListener("click", () => {
    const isOpen = body.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    body.classList.remove("nav-open");
    if (navToggle) {
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
});

function getActivePanel() {
  return document.querySelector(".menu-panel.active");
}

function filterMenuItems() {
  const activePanel = getActivePanel();
  if (!activePanel || !menuSearch || !noResults) return;

  const query = menuSearch.value.trim().toLowerCase();
  const items = activePanel.querySelectorAll(".menu-item");
  let visibleCount = 0;

  items.forEach((item) => {
    const isMatch = item.textContent.toLowerCase().includes(query);
    item.hidden = query.length > 0 && !isMatch;

    if (!item.hidden) {
      visibleCount += 1;
    }
  });

  noResults.hidden = visibleCount !== 0;
}

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetMenu = button.dataset.menu;

    tabButtons.forEach((tab) => tab.classList.remove("active"));
    button.classList.add("active");

    menuPanels.forEach((panel) => {
      panel.classList.toggle("active", panel.dataset.panel === targetMenu);
      panel.querySelectorAll(".menu-item").forEach((item) => {
        item.hidden = false;
      });
    });

    if (menuSearch) {
      menuSearch.value = "";
    }

    if (noResults) {
      noResults.hidden = true;
    }
  });
});

if (menuSearch) {
  menuSearch.addEventListener("input", filterMenuItems);
}
