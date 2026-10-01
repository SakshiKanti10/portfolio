const header = document.querySelector("nav");
const links = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("#home, section[id]");
const mobileMenu = document.getElementById("mobile-menu");
const menuToggle = document.getElementById("menu-toggle");
const revealElements = document.querySelectorAll(".reveal");
const counterItems = document.querySelectorAll("[data-target]");
const typeText = document.getElementById("type-text");
const phrases = ["web applications", "AI-powered solutions", "scalable platforms", "user experiences"];
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let countersStarted = false;
let scrollTicking = false;

function updateHeader() {
  header.classList.toggle("scrolled", window.scrollY > 24);
}

function setActiveLink() {
  const line = (header?.offsetHeight || 72) + 96;
  let current = "home";
  sections.forEach((section) => {
    if (section.getBoundingClientRect().top <= line) current = section.id;
  });
  const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
  if (atBottom) current = sections[sections.length - 1].id;
  links.forEach((link) => {
    const active = link.getAttribute("href") === `#${current}`;
    link.classList.toggle("active", active);
    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
}

function setMenuOpen(open) {
  mobileMenu.classList.toggle("open", open);
  mobileMenu.setAttribute("aria-hidden", open ? "false" : "true");
  menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
  menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  document.body.classList.toggle("menu-open", open);
  if (open) {
    const firstLink = mobileMenu.querySelector("a");
    if (firstLink) firstLink.focus();
  }
}

function typeLoop() {
  if (!typeText) return;
  if (reduceMotion) {
    typeText.textContent = phrases[0];
    return;
  }
  const current = phrases[phraseIndex];
  if (!isDeleting) {
    typeText.textContent = current.slice(0, charIndex + 1);
    charIndex += 1;
    if (charIndex === current.length) {
      isDeleting = true;
      window.setTimeout(typeLoop, 1400);
      return;
    }
  } else {
    typeText.textContent = current.slice(0, Math.max(0, charIndex - 1));
    charIndex -= 1;
    if (charIndex <= 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }
  window.setTimeout(typeLoop, isDeleting ? 48 : 78);
}

function animateCounters() {
  if (countersStarted) return;
  countersStarted = true;
  counterItems.forEach((item) => {
    const target = Number(item.dataset.target) || 0;
    if (reduceMotion) {
      item.textContent = `${target}+`;
      return;
    }
    const start = performance.now();
    const duration = 1100;
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      item.textContent = `${Math.round(target * eased)}+`;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
}

function createObserver() {
  if (!("IntersectionObserver" in window) || reduceMotion) {
    revealElements.forEach((element) => element.classList.add("visible"));
    animateCounters();
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      if (entry.target.closest("#home")) animateCounters();
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08 });
  revealElements.forEach((element) => observer.observe(element));
}

function hardenLinks() {
  document.querySelectorAll('a[target="_blank"]').forEach((anchor) => {
    const rel = new Set((anchor.getAttribute("rel") || "").split(/\s+/).filter(Boolean));
    rel.add("noopener");
    rel.add("noreferrer");
    anchor.setAttribute("rel", Array.from(rel).join(" "));
  });

  document.querySelectorAll('a[href="#"]').forEach((anchor) => {
    anchor.classList.add("is-pending");
    anchor.setAttribute("aria-disabled", "true");
    if (!anchor.getAttribute("title")) {
      anchor.setAttribute("title", "Link coming soon");
    }
    anchor.addEventListener("click", (event) => {
      event.preventDefault();
    });
  });
}

function trapMenuFocus(event) {
  if (event.key !== "Tab" || !mobileMenu.classList.contains("open")) return;
  const items = [menuToggle, ...mobileMenu.querySelectorAll("a")];
  const first = items[0];
  const last = items[items.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

window.addEventListener("scroll", () => {
  if (scrollTicking) return;
  scrollTicking = true;
  requestAnimationFrame(() => {
    updateHeader();
    setActiveLink();
    scrollTicking = false;
  });
}, { passive: true });

window.addEventListener("load", setActiveLink);
window.addEventListener("hashchange", () => requestAnimationFrame(setActiveLink));

window.addEventListener("resize", () => {
  if (window.innerWidth > 860 && mobileMenu.classList.contains("open")) {
    setMenuOpen(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && mobileMenu.classList.contains("open")) {
    setMenuOpen(false);
    menuToggle.focus();
    return;
  }
  trapMenuFocus(event);
});

window.addEventListener("DOMContentLoaded", () => {
  typeLoop();
  createObserver();
  hardenLinks();
  updateHeader();
  setActiveLink();
  menuToggle.addEventListener("click", () => {
    setMenuOpen(!mobileMenu.classList.contains("open"));
  });
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuOpen(false));
  });
});
