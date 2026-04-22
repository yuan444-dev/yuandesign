// =========================
// MAIN.JS — YUAN DESIGN
// =========================

gsap.registerPlugin(ScrollTrigger);

// =========================
// 1. LOADER + INIT
// =========================
window.addEventListener("load", () => {
  const loader   = document.getElementById("loader");
  const progress = document.querySelector(".loader-progress");
  const logo     = document.querySelector(".loader-logo");
  const vid      = document.querySelector(".loader-video");

  const tl = gsap.timeline({
    onComplete: () => {
      loader.style.display = "none";
      initHero();
      initScrollAnimations();
    }
  });

  tl
    .to(vid,      { opacity: 1, scale: 1, duration: 0.9, ease: "power3.out" })
    .to(logo,     { opacity: 1, y: 0,     duration: 0.7, ease: "power3.out" }, "-=0.4")
    .to(progress, { width: "100%",         duration: 1.1, ease: "power2.inOut" }, "-=0.3")
    .to(loader,   { opacity: 0,            duration: 0.6, ease: "power2.out" });
});

// =========================
// 2. HERO INTRO
// =========================
function initHero() {
  // Animate headline words in
  const mainWords = document.querySelectorAll(".headline-main");
  const italicWords = document.querySelectorAll(".headline-italic");

  mainWords.forEach(word => {
    const delay = parseFloat(word.getAttribute("data-delay") || 0);
    gsap.to(word, {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power4.out",
      delay: delay
    });
  });

  italicWords.forEach(word => {
    const delay = parseFloat(word.getAttribute("data-delay") || 0);
    gsap.to(word, {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power4.out",
      delay: delay
    });
  });

  // Hover interactions on headline words
  mainWords.forEach(word => {
    word.addEventListener("mouseenter", function() {
      gsap.to(this, { color: "var(--pink)", duration: 0.3, ease: "power2.out" });
    });
    word.addEventListener("mouseleave", function() {
      gsap.to(this, { color: "var(--white)", duration: 0.3, ease: "power2.out" });
    });
  });
}

// =========================
// 3. HEADER SCROLL STATE & VISIBILITY
// =========================
const header = document.getElementById("header");

window.addEventListener("scroll", () => {
  if (window.scrollY < 10) {
    header.classList.remove("header-hidden");
  } else {
    header.classList.add("header-hidden");
  }
}, { passive: true });

// =========================
// 4. SCROLL ANIMATIONS
// =========================
function initScrollAnimations() {

  gsap.utils.toArray(".section-label").forEach(el => {
    gsap.to(el, {
      opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none reverse" }
    });
  });

  gsap.utils.toArray(".section-title .reveal-word").forEach(word => {
    gsap.to(word, {
      y: 0, duration: 1.1, ease: "power4.out",
      scrollTrigger: { trigger: word, start: "top 90%", toggleActions: "play none none reverse" }
    });
  });

  gsap.utils.toArray(".about-heading .reveal-word").forEach((word, i) => {
    gsap.to(word, {
      y: 0, duration: 1.1, ease: "power4.out", delay: i * 0.08,
      scrollTrigger: { trigger: word, start: "top 90%", toggleActions: "play none none reverse" }
    });
  });

  gsap.to(".about-statement", {
    opacity: 1, y: 0, duration: 1, ease: "power3.out",
    scrollTrigger: { trigger: ".about-statement", start: "top 87%", toggleActions: "play none none reverse" }
  });

  gsap.utils.toArray(".about-details p").forEach((p, i) => {
    gsap.to(p, {
      opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: i * 0.12,
      scrollTrigger: { trigger: p, start: "top 87%", toggleActions: "play none none reverse" }
    });
  });

  gsap.to(".about-tags", {
    opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
    scrollTrigger: { trigger: ".about-tags", start: "top 88%", toggleActions: "play none none reverse" }
  });

  gsap.to(".about-socials", {
    opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
    scrollTrigger: { trigger: ".about-socials", start: "top 88%", toggleActions: "play none none reverse" }
  });

  gsap.to(".about-visual", {
    opacity: 1, y: 0, duration: 1.2, ease: "power3.out",
    scrollTrigger: { trigger: ".about-visual", start: "top 85%", toggleActions: "play none none reverse" }
  });

  // Info strip animate in
  gsap.utils.toArray(".info-col").forEach((col, i) => {
    gsap.fromTo(col,
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: i * 0.1,
        scrollTrigger: { trigger: ".hero-info-strip", start: "top 90%", toggleActions: "play none none reverse" }
      }
    );
  });

  // Showcase cards stagger
  gsap.utils.toArray(".showcase-card").forEach((card, i) => {
    gsap.fromTo(card,
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0, duration: 1, ease: "power3.out",
        delay: i * 0.1,
        scrollTrigger: { trigger: card, start: "top 88%", toggleActions: "play none none reverse" }
      }
    );
  });

  // Archive cards
  gsap.utils.toArray(".card-item").forEach((item, i) => {
    gsap.to(item, {
      opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: i * 0.07,
      scrollTrigger: { trigger: item, start: "top 88%", toggleActions: "play none none reverse" }
    });
  });

  // Big footer text scroll
  gsap.fromTo(".bigtext",
    { x: "5%" },
    {
      x: "-5%",
      ease: "none",
      scrollTrigger: {
        trigger: "footer",
        start: "top bottom",
        end: "bottom top",
        scrub: 1
      }
    }
  );
}

// =========================
// 5. CUSTOM CURSOR
// =========================
const cursor         = document.querySelector(".cursor");
const cursorFollower = document.querySelector(".cursor-follower");

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener("mousemove", e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + "px";
  cursor.style.top  = mouseY + "px";
});

(function animateFollower() {
  followerX += (mouseX - followerX) * 0.1;
  followerY += (mouseY - followerY) * 0.1;
  cursorFollower.style.left = followerX + "px";
  cursorFollower.style.top  = followerY + "px";
  requestAnimationFrame(animateFollower);
})();

const hoverEls = document.querySelectorAll(
  "a, button, .showcase-card, .card-item, .about-socials a"
);
hoverEls.forEach(el => {
  el.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
  el.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
});

// =========================
// 6. PROJECT MODAL
// =========================
const modal     = document.getElementById("project-modal");
const mBackdrop = modal.querySelector(".pmodal-backdrop");
const mClose    = modal.querySelector(".pmodal-close");
const mNumber   = modal.querySelector(".pmodal-number");
const mCat      = modal.querySelector(".pmodal-cat");
const mYear     = modal.querySelector(".pmodal-year");
const mTitle    = modal.querySelector(".pmodal-title");
const mDesc     = modal.querySelector(".pmodal-desc");
const mTags     = modal.querySelector(".pmodal-tags");
const mSlides   = modal.querySelector(".pmodal-slides");

function openModal(card) {
  const images      = card.getAttribute("data-mockups").split(",").map(s => s.trim());
  const title       = card.getAttribute("data-title");
  const year        = card.getAttribute("data-year");
  const category    = card.getAttribute("data-category");
  const description = card.getAttribute("data-description");
  const tags        = card.getAttribute("data-tags").split(",").map(s => s.trim());
  const index       = card.getAttribute("data-index");

  mNumber.textContent = "0" + (parseInt(index) + 1);
  mCat.textContent    = category;
  mYear.textContent   = year;
  mTitle.textContent  = title;
  mDesc.textContent   = description;
  mTags.innerHTML     = tags.map(t => `<span>${t}</span>`).join("");

  mSlides.innerHTML = images.map((src, i) => {
    const isVideo = /\.(mp4|webm|ogg)$/i.test(src);
    const element = isVideo 
      ? `<video controls><source src="${src}" type="video/${src.split(".").pop()}"></video>`
      : `<img src="${src}" alt="Project image ${i+1}" loading="lazy">`;
    return `<div class="pmodal-slide">${element}</div>`;
  }).join("");

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
  document.body.style.position = "fixed";
  document.body.style.width = "100%";
}

function closeModal() {
  if (!modal.classList.contains("active")) return; // ← only run if modal is truly open
  
  modal.classList.remove("active");
  document.body.style.overflow = "";
  document.body.style.position = "";
  document.body.style.width = "";
  setTimeout(() => { mSlides.innerHTML = ""; }, 500);
  
  const projectsSection = document.getElementById("projects");
  if (projectsSection) {
    projectsSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
document.querySelectorAll(".showcase-card").forEach(card => {
  card.addEventListener("click", () => openModal(card));
});

mClose.addEventListener("click", closeModal);
mBackdrop.addEventListener("click", closeModal);

document.addEventListener("keydown", e => {
  if (!modal.classList.contains("active")) return;
  if (e.key === "Escape") closeModal();
});

// =========================
// 7. THREE.JS PARTICLES
// =========================
const scene    = new THREE.Scene();
const camera   = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
document.getElementById("particles-bg").appendChild(renderer.domElement);
camera.position.z = 5;

const COUNT = 600;
const geo   = new THREE.BufferGeometry();
const pos   = new Float32Array(COUNT * 3);

for (let i = 0; i < COUNT * 3; i++) {
  pos[i] = (Math.random() - 0.5) * 40;
}

geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));

const mat = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 0.025,
  transparent: true,
  opacity: 0.18
});

const particles = new THREE.Points(geo, mat);
scene.add(particles);

let mouseNX = 0, mouseNY = 0;
let lastParticleMoveTime = 0;

document.addEventListener("mousemove", e => {
  const now = performance.now();
  if (now - lastParticleMoveTime < 33) return;
  lastParticleMoveTime = now;
  mouseNX = (e.clientX / window.innerWidth  - 0.5) * 0.3;
  mouseNY = (e.clientY / window.innerHeight - 0.5) * 0.3;
});

(function renderLoop() {
  requestAnimationFrame(renderLoop);
  particles.rotation.y += 0.00015 + mouseNX * 0.0008;
  particles.rotation.x += 0.00008 + mouseNY * 0.0004;
  renderer.render(scene, camera);
})();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// =========================
// 8. NAV ACTIVE STATE
// =========================
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

ScrollTrigger.create({
  onUpdate() {
    sections.forEach(sec => {
      const rect = sec.getBoundingClientRect();
      if (rect.top <= 100 && rect.bottom >= 100) {
        navLinks.forEach(a => {
          const isActive = a.getAttribute("href") === "#" + sec.id;
          a.style.color = isActive ? "var(--white)" : "";
          a.classList.toggle("active", isActive);
        });
      }
    });
  }
});

// =========================
// 9. SMOOTH SCROLL
// =========================
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    const id = link.getAttribute("href");
    if (id === "#") return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// =========================
// 10. ARCHIVE LIGHTBOX
// =========================
const lightbox    = document.getElementById("lightbox");
const lightboxImg = lightbox.querySelector("img");

lightbox.addEventListener("click", () => {
  lightbox.classList.remove("active");
  setTimeout(() => { lightboxImg.src = ""; }, 400);
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape") lightbox.classList.remove("active");
});

document.querySelectorAll('.card-item').forEach(item => {
  item.addEventListener('click', (e) => {
    e.stopPropagation();
    const src = item.querySelector('img').src;
    if (!src) return;
    lightboxImg.src = src;
    lightbox.classList.add('active');
  });
});

// =========================
// 11. BACK TO TOP
// =========================
const backToTopBtn = document.getElementById("back-to-top");

ScrollTrigger.create({
  start: "top -300",
  onEnter:     () => backToTopBtn.classList.add("visible"),
  onLeaveBack: () => backToTopBtn.classList.remove("visible")
});

backToTopBtn.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
backToTopBtn.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// =========================
// FULLSCREEN MENU
// Append to main.js
// (GSAP + ScrollTrigger already registered above)
// =========================

(function initMenu() {
  const toggle  = document.getElementById('menuToggle');
  const overlay = document.getElementById('menuOverlay');
  const header  = document.getElementById('header');
  let isOpen    = false;

  // ── Open / Close ──────────────────────────────
  function openMenu() {
    isOpen = true;
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    toggle.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-is-open');
    document.body.style.overflow = 'hidden';

    // Animate nav links in with GSAP (same easing as rest of site)
    gsap.fromTo(
      '.menu-item',
      { opacity: 0 },
      { opacity: 1, duration: 0.01, stagger: 0 }   // instant; CSS handles the slide
    );
  }

  function closeMenu() {
    isOpen = false;
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    toggle.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-is-open');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', () => {
    isOpen ? closeMenu() : openMenu();
  });

  // ── Close on nav link click ───────────────────
  document.querySelectorAll('.menu-link').forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
      // smooth scroll handled by existing section-9 listener
    });
  });

  // ── Close on ESC ─────────────────────────────
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && isOpen) closeMenu();
  });

  // ── Register menu elements with cursor hover ──
  // (extends the existing hoverEls logic in section-5)
  [toggle, ...document.querySelectorAll('.menu-link, .menu-aside-link')].forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });

})();