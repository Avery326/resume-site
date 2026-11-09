const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const menuButton = document.querySelector("[data-menu-button]");
const navLinks = [...document.querySelectorAll(".nav a")];
const sections = [...document.querySelectorAll("main section[id]")];
const rails = [...document.querySelectorAll(".rail[id]")];
const revealItems = [...document.querySelectorAll(".reveal")];

function closeMenu() {
  nav?.classList.remove("is-open");
  menuButton?.setAttribute("aria-expanded", "false");
}

menuButton?.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  nav?.classList.toggle("is-open", !isOpen);
});

navLinks.forEach((link) => link.addEventListener("click", closeMenu));

window.addEventListener(
  "scroll",
  () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 18);
  },
  { passive: true },
);

window.addEventListener("resize", () => {
  if (window.innerWidth > 780) closeMenu();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

const sectionObserver = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

    if (!visible.length) return;
    const id = visible[0].target.id;
    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
    });
  },
  { rootMargin: "-25% 0px -60% 0px", threshold: [0.01, 0.2, 0.5] },
);

sections.forEach((section) => sectionObserver.observe(section));

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },
  { rootMargin: "0px 0px -8% 0px", threshold: 0.06 },
);

revealItems.forEach((item) => revealObserver.observe(item));

window.setTimeout(() => {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}, 2400);

function updateRailButtons(rail) {
  const id = rail.id;
  const previous = document.querySelector(`[data-rail-prev="${id}"]`);
  const next = document.querySelector(`[data-rail-next="${id}"]`);
  if (!previous || !next) return;

  const maxScroll = rail.scrollWidth - rail.clientWidth;
  previous.disabled = rail.scrollLeft <= 3;
  next.disabled = rail.scrollLeft >= maxScroll - 3;
  rail.classList.toggle("is-at-end", rail.scrollLeft >= maxScroll - 3);
}

function scrollRail(id, direction) {
  const rail = document.getElementById(id);
  if (!rail) return;
  const amount = Math.max(rail.clientWidth * 0.78, 260);
  rail.scrollBy({ left: amount * direction, behavior: "smooth" });
}

document.querySelectorAll("[data-rail-prev]").forEach((button) => {
  button.addEventListener("click", () => scrollRail(button.dataset.railPrev, -1));
});

document.querySelectorAll("[data-rail-next]").forEach((button) => {
  button.addEventListener("click", () => scrollRail(button.dataset.railNext, 1));
});

rails.forEach((rail) => {
  updateRailButtons(rail);
  rail.addEventListener("scroll", () => updateRailButtons(rail), { passive: true });
  window.addEventListener("resize", () => updateRailButtons(rail));

  let dragging = false;
  let startX = 0;
  let startScroll = 0;

  rail.addEventListener("pointerdown", (event) => {
    if (event.pointerType !== "mouse") return;
    dragging = true;
    startX = event.clientX;
    startScroll = rail.scrollLeft;
    rail.classList.add("is-dragging");
    rail.setPointerCapture(event.pointerId);
  });

  rail.addEventListener("pointermove", (event) => {
    if (!dragging) return;
    event.preventDefault();
    rail.scrollLeft = startScroll - (event.clientX - startX);
  });

  const stopDragging = (event) => {
    if (!dragging) return;
    dragging = false;
    rail.classList.remove("is-dragging");
    if (rail.hasPointerCapture(event.pointerId)) {
      rail.releasePointerCapture(event.pointerId);
    }
    updateRailButtons(rail);
  };

  rail.addEventListener("pointerup", stopDragging);
  rail.addEventListener("pointercancel", stopDragging);
});

document.querySelectorAll("[data-print]").forEach((button) => {
  button.addEventListener("click", () => window.print());
});

const year = document.querySelector("[data-year]");
if (year) year.textContent = new Date().getFullYear();
