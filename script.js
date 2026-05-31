const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.nav-links a');
const tabButtons = document.querySelectorAll('.tab-button');
const menuPanels = document.querySelectorAll('[data-menu-panel]');
const menuSearch = document.querySelector('#menuSearch');
const year = document.querySelector('#year');

if (year) {
  year.textContent = new Date().getFullYear();
}

if (navToggle) {
  navToggle.addEventListener('click', () => {
    const isOpen = document.body.classList.toggle('nav-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    document.body.classList.remove('nav-open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

function getActivePanel() {
  return document.querySelector('[data-menu-panel].active');
}

function clearNoResults(panel) {
  panel?.querySelector('.no-results')?.remove();
}

function filterActiveMenu() {
  const panel = getActivePanel();
  if (!panel || !menuSearch) return;

  const query = menuSearch.value.trim().toLowerCase();
  const items = panel.querySelectorAll('.menu-item');
  let visibleCount = 0;

  clearNoResults(panel);

  items.forEach((item) => {
    const matches = item.textContent.toLowerCase().includes(query);
    item.hidden = Boolean(query && !matches);
    if (!item.hidden) visibleCount += 1;
  });

  if (query && visibleCount === 0) {
    const message = document.createElement('p');
    message.className = 'no-results';
    message.textContent = `No menu items found for “${menuSearch.value}”. Try another search term.`;
    panel.appendChild(message);
  }
}

tabButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const target = button.dataset.menuTarget;

    tabButtons.forEach((btn) => btn.classList.toggle('active', btn === button));
    menuPanels.forEach((panel) => {
      const isActive = panel.dataset.menuPanel === target;
      panel.classList.toggle('active', isActive);
      panel.querySelectorAll('.menu-item').forEach((item) => {
        item.hidden = false;
      });
      clearNoResults(panel);
    });

    if (menuSearch) {
      menuSearch.value = '';
      menuSearch.focus({ preventScroll: true });
    }
  });
});

menuSearch?.addEventListener('input', filterActiveMenu);
