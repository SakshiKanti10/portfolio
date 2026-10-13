const toggle = document.querySelector(".menu-toggle");
const menu = document.getElementById("site-menu");

function setMenu(open) {
  menu.classList.toggle("open", open);
  toggle.setAttribute("aria-expanded", open ? "true" : "false");
  toggle.textContent = open ? "Close" : "Menu";
}

toggle.addEventListener("click", () => {
  setMenu(!menu.classList.contains("open"));
});

menu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 720 && menu.classList.contains("open")) {
    setMenu(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menu.classList.contains("open")) {
    setMenu(false);
    toggle.focus();
  }
});
