// SAVEURS PRESTIGE — interactions & scroll animations
// IMPORTANT: Remplacez le numéro ci-dessous par le WhatsApp de Chef Soukaina.
// Format international sans +, par exemple : 2126XXXXXXXX
const WHATSAPP_NUMBER = "2126XXXXXXXX";
const ORDER_MESSAGE = "Bonjour Chef Soukaina, je souhaite avoir des informations sur vos créations et passer une commande.";

const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(ORDER_MESSAGE)}`;
["whatsapp-order", "floating-whatsapp"].forEach(id => {
  const link = document.getElementById(id);
  if (link) link.href = whatsappUrl;
});

document.getElementById("year").textContent = new Date().getFullYear();

const loader = document.querySelector(".loader");
window.addEventListener("load", () => {
  window.setTimeout(() => loader.classList.add("done"), 450);
});

const header = document.querySelector(".site-header");
const updateHeader = () => header.classList.toggle("scrolled", window.scrollY > 35);
window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
menuButton.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
}));

// Reveal elements as they enter the viewport.
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.13, rootMargin: "0px 0px -35px 0px" });
document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

// Subtle hero parallax on desktop; disabled for reduced-motion preference.
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const heroImage = document.querySelector(".hero-image");
if (!reduceMotion && window.matchMedia("(min-width: 701px)").matches) {
  window.addEventListener("scroll", () => {
    const y = Math.min(window.scrollY * 0.18, 120);
    heroImage.style.backgroundPosition = `center calc(52% + ${y}px)`;
  }, { passive: true });
}