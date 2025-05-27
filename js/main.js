// ===========================
// SMOOTH SCROLL
// ===========================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// voor about
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
      }
    });
  },
  { threshold: 0.2 } //
);

document.querySelectorAll(".about").forEach((el) => observer.observe(el));

window.addEventListener("DOMContentLoaded", () => {
  const splash = document.getElementById("splash-screen");
  setTimeout(() => {
    splash.classList.add("fade-out");

    setTimeout(() => {
      splash.style.display = "none";
    }, 2500);
  }, 6000);
});

// ===========================
//  CURSOR
// ===========================

const cursor = document.querySelector(".cursor");
let posX = 0,
  posY = 0;
let mouseX = 0,
  mouseY = 0;

function updateCursor() {
  const dx = mouseX - posX;
  const dy = mouseY - posY;

  posX += dx * 0.2;
  posY += dy * 0.2;

  cursor.style.left = posX + "px";
  cursor.style.top = posY + "px";

  requestAnimationFrame(updateCursor);
}
document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

updateCursor();

document.querySelectorAll("a, button, [data-hover]").forEach((el) => {
  el.addEventListener("mouseenter", () => cursor.classList.add("cursor-hover"));
  el.addEventListener("mouseleave", () =>
    cursor.classList.remove("cursor-hover")
  );
});

document.addEventListener("mousedown", () =>
  cursor.classList.add("cursor-active")
);
document.addEventListener("mouseup", () =>
  cursor.classList.remove("cursor-active")
);

// ===========================
// MODAL
// ===========================

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("contact-dialog");
  const openButton = document.getElementById("open-dialog");
  const closeButton = document.getElementById("close-dialog");

  if (!modal || !openButton || !closeButton) return;

  const openModal = () => {
    document.body.classList.add("modal-open");
    modal.setAttribute("open", "true");
    modal.setAttribute("data-open", "true");

    setTimeout(() => {
      modal.focus();
    }, 100);
    document.addEventListener("keydown", handleEscapeKey);
  };

  const closeModal = () => {
    modal.classList.add("closing");
    modal.setAttribute("data-open", "false");

    setTimeout(() => {
      modal.removeAttribute("open");
      modal.classList.remove("closing");
      openButton.focus();
      document.body.classList.remove("modal-open");
    }, 600);
    document.removeEventListener("keydown", handleEscapeKey);
  };

  const handleEscapeKey = (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  };

  openButton.addEventListener("click", openModal);
  closeButton.addEventListener("click", closeModal);
  modal.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeModal();
  });

  if (!("open" in document.createElement("dialog"))) {
    modal.hidden = true;
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");

    modal.show = openModal;
    modal.close = closeModal;
  }
});

// ===========================
//  MENU
// ===========================
const menuToggle = document.getElementById("menu-toggle");
const fullscreenMenu = document.getElementById("fullscreen-menu");
const menuLinks = document.querySelectorAll(".menu__link");

function toggleMenu() {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";

  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  fullscreenMenu.classList.toggle("is-active");
  document.body.classList.toggle("menu-open");
  menuToggle.textContent = isExpanded ? "Menu" : "Close";
}
menuToggle.addEventListener("click", toggleMenu);

menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menuLinks.forEach((l) => l.removeAttribute("aria-current"));
    link.setAttribute("aria-current", "page");

    if (fullscreenMenu.classList.contains("is-active")) {
      toggleMenu();
    }
  });
});

//  closes menu
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && fullscreenMenu.classList.contains("is-active")) {
    toggleMenu();
  }
});

// ===========================
// theme
// ===========================

const themeToggle = document.getElementById("theme-toggle");
const root = document.documentElement;

if (localStorage.getItem("theme") === "dark") {
  root.classList.add("dark");
}
themeToggle?.addEventListener("click", () => {
  root.classList.toggle("dark");

  if (root.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});
