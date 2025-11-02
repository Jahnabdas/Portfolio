const welcomeWords = [
  "Welcome",
  "স্বাগতম",
  "स्वागत",
  "いらっしゃいませ",
  "Bienvenido",
];

let idx = 0;
const welcomeText = document.getElementById("welcome-text");
const welcomeScreen = document.querySelector(".welcome-container");
document.body.style.visibility = "visible";

function showWelcomeWord() {
  welcomeText.style.animation = "none";

  setTimeout(() => {
    welcomeText.innerText = welcomeWords[idx];
    welcomeText.style.animation = "welcomeFade 1.2s ease forwards";

    idx++;

    if (idx < welcomeWords.length) {
      setTimeout(showWelcomeWord, 1000); // smoother speed
    } else {
      setTimeout(() => {
        welcomeScreen.classList.add("hide");

        document.getElementById("navbar").classList.add("show");

        setTimeout(() => {
          welcomeScreen.style.display = "none";
        }, 1200);
      }, 1500);
    }
  }, 100);
}

showWelcomeWord();

// Smooth scroll functionality
function scrollToSection(id) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  lastScroll = currentScroll;

  // Highlight nav based on section in view
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("onclick").includes(current)) {
            link.classList.add("active");
        }
    });
});

});

// Toast notification system
function showToast(message, duration = 3000) {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = "slideIn 0.3s ease-out reverse";
    setTimeout(() => {
      container.removeChild(toast);
    }, 300);
  }, duration);
}

// Contact form handling
const contactForm = document.getElementById("contact-form");
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  // Simulate form submission
  showToast("Message sent! I'll get back to you soon.");

  // Clear form
  contactForm.reset();
});

// Set current year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Add intersection observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animation = "fadeIn 0.6s ease-out";
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all sections
document.querySelectorAll("section").forEach((section) => {
  observer.observe(section);
});

// Observe cards
document.querySelectorAll(".feature-card, .project-card").forEach((card) => {
  observer.observe(card);
});
