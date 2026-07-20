const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".global-nav");
const navLinks = document.querySelectorAll(".global-nav a");
const revealItems = document.querySelectorAll(".reveal");

const updateHeader = () => {
  header.classList.toggle("scrolled", window.scrollY > 24);
};

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

const closeMenu = () => {
  menuButton.classList.remove("open");
  nav.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
};

menuButton.addEventListener("click", () => {
  const willOpen = !nav.classList.contains("open");
  menuButton.classList.toggle("open", willOpen);
  nav.classList.toggle("open", willOpen);
  menuButton.setAttribute("aria-expanded", String(willOpen));
  document.body.style.overflow = willOpen ? "hidden" : "";
});

navLinks.forEach((link) => link.addEventListener("click", closeMenu));

window.addEventListener("resize", () => {
  if (window.innerWidth > 980) closeMenu();
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    rootMargin: "0px 0px -8% 0px",
    threshold: 0.12,
  }
);

revealItems.forEach((item) => observer.observe(item));
