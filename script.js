const roles = ["CSE student", "web developer", "problem solver", "curious learner"];
const typed = document.getElementById("typed");
let roleIndex = 0, charIndex = 0, deleting = false;

function type() {
  const word = roles[roleIndex];
  typed.textContent = word.slice(0, charIndex);
  if (!deleting && charIndex < word.length) {
    charIndex++;
    setTimeout(type, 100);
  } else if (!deleting) {
    deleting = true;
    setTimeout(type, 1500);
  } else if (charIndex > 0) {
    charIndex--;
    setTimeout(type, 50);
  } else {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(type, 300);
  }
}
type();

const themeBtn = document.getElementById("theme-toggle");
function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  themeBtn.textContent = theme === "dark" ? "Light" : "Dark";
  try { localStorage.setItem("theme", theme); } catch (e) { }
}
let saved = "dark";
try { saved = localStorage.getItem("theme") || "dark"; } catch (e) { }
setTheme(saved);
themeBtn.addEventListener("click", () => {
  setTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark");
});

const header = document.getElementById("header");
const progress = document.getElementById("progress");
const sections = document.querySelectorAll("main section");
const navLinks = document.querySelectorAll("nav a");
window.addEventListener("scroll", () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = (window.scrollY / max) * 100 + "%";
  header.classList.toggle("scrolled", window.scrollY > 20);
  let current = "home";
  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 140) current = section.id;
  });
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === "#" + current);
  });
}, { passive: true });

const menuBtn = document.getElementById("menu-toggle");
const nav = document.getElementById("nav");
menuBtn.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});
navLinks.forEach((link) => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuBtn.setAttribute("aria-expanded", "false");
}));

const glow = document.getElementById("glow");
window.addEventListener("mousemove", (e) => {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});

document.querySelectorAll(".spot").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mx", e.clientX - rect.left + "px");
    card.style.setProperty("--my", e.clientY - rect.top + "px");
  });
});

const tilt = document.getElementById("tilt");
tilt.addEventListener("mousemove", (e) => {
  const rect = tilt.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width - 0.5;
  const y = (e.clientY - rect.top) / rect.height - 0.5;
  tilt.style.transform = "rotateY(" + x * 12 + "deg) rotateX(" + -y * 12 + "deg)";
});
tilt.addEventListener("mouseleave", () => {
  tilt.style.transform = "rotateY(0) rotateX(0)";
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("in");
    entry.target.querySelectorAll(".bar i").forEach((bar) => {
      bar.style.width = bar.dataset.level + "%";
    });
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

document.querySelectorAll("[data-count]").forEach((el) => {
  const target = Number(el.dataset.count);
  let value = 0;
  const step = setInterval(() => {
    value++;
    el.textContent = value + "+";
    if (value >= target) clearInterval(step);
  }, 180);
});

const filterButtons = document.querySelectorAll(".filter");
const projects = document.querySelectorAll(".project");
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    button.classList.add("active");
    const type = button.dataset.filter;
    projects.forEach((project) => {
      project.classList.toggle("hide", type !== "all" && project.dataset.type !== type);
    });
  });
});

const toast = document.getElementById("toast");
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

const form = document.getElementById("contact-form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const fields = [
    document.getElementById("name"),
    document.getElementById("email"),
    document.getElementById("message"),
  ];
  let valid = true;
  fields.forEach((field) => {
    const ok = field.value.trim() !== "" && field.checkValidity();
    field.classList.toggle("invalid", !ok);
    if (!ok) valid = false;
  });
  if (valid) {
    showToast("Message sent. Thank you!");
    form.reset();
  } else {
    showToast("Please fill all fields correctly.");
  }
});

document.getElementById("year").textContent = new Date().getFullYear();
