
/* =========================================
   SAVEURS PRESTIGE
   INTERACTIONS & ANIMATIONS
   Designed by Team NEXORA
========================================= */

/* CONFIGURATION */

const WHATSAPP_NUMBER = "2126XXXXXXXX";

const ORDER_MESSAGE =
  "Bonjour Chef Soukaina, je souhaite avoir des informations sur vos créations et passer une commande.";


/* =========================================
   WHATSAPP
========================================= */

const whatsappUrl =
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(ORDER_MESSAGE)}`;

["whatsapp-order", "floating-whatsapp"].forEach(id => {
  const link = document.getElementById(id);

  if (link) {
    link.href = whatsappUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  }
});


/* =========================================
   CURRENT YEAR
========================================= */

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


/* =========================================
   PAGE LOADER
========================================= */

const loader = document.querySelector(".loader");

function hideLoader() {
  if (loader) {
    loader.classList.add("done");
  }
}

window.addEventListener("load", () => {
  setTimeout(hideLoader, 450);
});


/* =========================================
   HEADER SCROLL EFFECT
========================================= */

const header = document.querySelector(".site-header");

function updateHeader() {
  if (!header) return;

  header.classList.toggle(
    "scrolled",
    window.scrollY > 35
  );
}

window.addEventListener("scroll", updateHeader, {
  passive: true
});

updateHeader();


/* =========================================
   MOBILE NAVIGATION
========================================= */

const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

if (menuButton && nav) {

  menuButton.addEventListener("click", () => {

    const isOpen = nav.classList.toggle("open");

    menuButton.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

  });

  nav.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {

      nav.classList.remove("open");

      menuButton.setAttribute(
        "aria-expanded",
        "false"
      );

    });

  });

  document.addEventListener("click", event => {

    if (
      !nav.contains(event.target) &&
      !menuButton.contains(event.target)
    ) {

      nav.classList.remove("open");

      menuButton.setAttribute(
        "aria-expanded",
        "false"
      );

    }

  });

}


/* =========================================
   SCROLL REVEAL ANIMATIONS
========================================= */

const revealElements =
  document.querySelectorAll(".reveal");

const reduceMotion =
  window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

if ("IntersectionObserver" in window && !reduceMotion) {

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add("visible");

          observer.unobserve(entry.target);

        }

      });

    },
    {
      threshold: 0.13,
      rootMargin: "0px 0px -35px 0px"
    }
  );

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

} else {

  revealElements.forEach(element => {
    element.classList.add("visible");
  });

}


/* =========================================
   HERO PARALLAX
========================================= */

const heroImage = document.querySelector(".hero-image");

if (
  heroImage &&
  !reduceMotion &&
  window.matchMedia("(min-width: 701px)").matches
) {

  let ticking = false;

  window.addEventListener("scroll", () => {

    if (ticking) return;

    ticking = true;

    requestAnimationFrame(() => {

      const y = Math.min(
        window.scrollY * 0.18,
        120
      );

      heroImage.style.backgroundPosition =
        `center calc(50% + ${y}px)`;

      ticking = false;

    });

  }, {
    passive: true
  });

}


/* =========================================
   PRODUCT IMAGE HOVER
========================================= */

document.querySelectorAll(".product-card").forEach(card => {

  card.addEventListener("mouseenter", () => {
    card.classList.add("active");
  });

  card.addEventListener("mouseleave", () => {
    card.classList.remove("active");
  });

});


/* =========================================
   SMOOTH ANCHOR NAVIGATION
========================================= */

document.querySelectorAll('a[href^="#"]').forEach(link => {

  link.addEventListener("click", event => {

    const targetId = link.getAttribute("href");

    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);

    if (!target) return;

    event.preventDefault();

    target.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start"
    });

  });

});


/* =========================================
   SAVEURS PRESTIGE — READY
   TEAM NEXORA
========================================= */

console.log(
  "SAVEURS PRESTIGE — Website initialized successfully."
);
