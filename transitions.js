// =========================
// TRANSITIONS.JS v2 — ZOOM EDITION
// Place <script src="transitions.js"></script> BEFORE main.js
// Requires GSAP + ScrollTrigger (already loaded in your HTML)
// =========================

(function () {
  "use strict";


  // ─────────────────────────────────────────────────────────────
  // 1. PAGE-TRANSITION COLUMN OVERLAY
  //    5 vertical columns that scaleY in/out on nav clicks
  // ─────────────────────────────────────────────────────────────
  const overlay = document.createElement("div");
  overlay.id = "zt-overlay";
  const COLS = 5;
  for (let i = 0; i < COLS; i++) {
    const c = document.createElement("div");
    c.className = "zt-col";
    overlay.appendChild(c);
  }
  document.body.appendChild(overlay);
  const cols = overlay.querySelectorAll(".zt-col");

  function coverScreen(onMidpoint) {
    gsap.set(cols, { scaleY: 0, transformOrigin: "bottom" });
    gsap.to(cols, {
      scaleY: 1,
      duration: 0.55,
      ease: "power4.inOut",
      stagger: { each: 0.05, from: "center" },
      onComplete: onMidpoint
    });
  }

  function uncoverScreen() {
    gsap.set(cols, { scaleY: 1, transformOrigin: "top" });
    gsap.to(cols, {
      scaleY: 0,
      duration: 0.55,
      ease: "power4.inOut",
      stagger: { each: 0.05, from: "center" }
    });
  }

  // Nav link click — cover → scroll → uncover
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      const id = link.getAttribute("href");
      if (id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      e.stopPropagation();

      coverScreen(() => {
        target.scrollIntoView({ block: "start" });
        requestAnimationFrame(() => uncoverScreen());
      });
    });
  });


  // ─────────────────────────────────────────────────────────────
  // 2. HERO — CINEMATIC ZOOM-OUT ON LOAD
  //    Hero content starts huge (scale 1.15) and zooms to 1
  // ─────────────────────────────────────────────────────────────
  window.addEventListener("load", () => {
    const heroCenter = document.querySelector(".hero-center");
    const heroMarquee = document.querySelector(".hero-marquee-wrap");
    if (!heroCenter) return;

    // Start scaled up, blur slightly
    gsap.set(heroCenter, { scale: 1.18, opacity: 0, filter: "blur(12px)" });
    gsap.set(heroMarquee, { scale: 1.08 });

    // After loader (~1.5s), zoom in to normal
    setTimeout(() => {
      gsap.to(heroCenter, {
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.4,
        ease: "expo.out"
      });
      gsap.to(heroMarquee, {
        scale: 1,
        duration: 1.8,
        ease: "expo.out"
      });
    }, 1550);
  });


  // ─────────────────────────────────────────────────────────────
  // 3. SECTION REVEAL — ZOOM IN FROM BELOW
  //    Each section's content zooms from scale(0.88) + translateY(60px)
  //    while a full-overlay curtain pulls up
  // ─────────────────────────────────────────────────────────────
  const SECTIONS = [
    { sel: ".projects", delay: 0 },
    { sel: ".archive",  delay: 0 },
    { sel: ".about",    delay: 0 }
  ];

  window.addEventListener("load", () => {
    SECTIONS.forEach(({ sel }) => {
      const el = document.querySelector(sel);
      if (!el) return;

      // Full section curtain — pulls up (scaleY from top)
      const curtain = document.createElement("div");
      curtain.style.cssText = `
        position:absolute; inset:0;
        background:#1a1a1a;
        transform-origin:top;
        z-index:50; pointer-events:none;
        will-change:transform;
      `;
      el.appendChild(curtain);

      // Accent line
      const line = document.createElement("div");
      line.className = "section-accent-line";
      el.appendChild(line);

      // Animate the section element itself — no wrapper div needed
      // (avoids breaking flex/grid layout inside archive, about, etc.)
      gsap.set(el, { scale: 0.88, y: 60, opacity: 0, transformOrigin: "top center" });

      ScrollTrigger.create({
        trigger: el,
        start: "top 78%",
        onEnter: () => {
          gsap.to(curtain, { scaleY: 0, duration: 1.1, ease: "expo.inOut" });
          gsap.to(el, { scale: 1, y: 0, opacity: 1, duration: 1.2, ease: "expo.out", delay: 0.15 });
          gsap.to(line, {
            width: "100%", duration: 1.1, ease: "power3.out", delay: 0.1,
            onComplete: () => gsap.to(line, { width: 0, transformOrigin: "right", duration: 0.65, ease: "power3.in", delay: 0.1 })
          });
        },
        onLeaveBack: () => {
          gsap.killTweensOf([curtain, el, line]);
          gsap.set(curtain, { scaleY: 1 });
          gsap.set(el, { scale: 0.88, y: 60, opacity: 0 });
          gsap.set(line, { width: 0 });
        }
      });
    });
  });


// ─────────────────────────────────────────────────────────────
// 4. ARCHIVE CARDS — INDIVIDUAL ZOOM CURTAINS (staggered)
// ─────────────────────────────────────────────────────────────
window.addEventListener("load", () => {
  document.querySelectorAll(".card-item").forEach((card, i) => {
    card.style.position = "relative";
    card.style.overflow = "hidden";

    const curtain = document.createElement("div");
    curtain.className = "card-zoom-curtain";
    card.appendChild(curtain);

    gsap.set(card, { scale: 0.82, opacity: 0, transformOrigin: "center bottom" });

    const colDelay = (i % 3) * 0.08;

    ScrollTrigger.create({
      trigger: card,
      start: "top 92%",
      onEnter: () => {
        gsap.to(curtain, { scaleY: 0, duration: 0.75, ease: "expo.inOut", delay: colDelay });
        gsap.to(card, { scale: 1, opacity: 1, duration: 0.9, ease: "expo.out", delay: colDelay + 0.05 });
      },
      onLeaveBack: () => {
        gsap.killTweensOf([curtain, card]);
        gsap.set(curtain, { scaleY: 1 });
        gsap.set(card, { scale: 0.82, opacity: 0 });
      }
    });
  });
});


  // ─────────────────────────────────────────────────────────────
  // 5. PROJECT ITEMS — ZOOM + SLIDE IN (staggered)
  // ─────────────────────────────────────────────────────────────
  window.addEventListener("load", () => {
    document.querySelectorAll(".project-item").forEach((item, i) => {
      gsap.set(item, { opacity: 0, scale: 0.9, x: -30 });

      ScrollTrigger.create({
        trigger: item,
        start: "top 88%",
        toggleActions: "play none none reverse",
        onEnter: () => {
          gsap.to(item, {
            opacity: 1,
            scale: 1,
            x: 0,
            duration: 0.85,
            ease: "expo.out",
            delay: i * 0.1
          });
        }
      });
    });
  });


  // ─────────────────────────────────────────────────────────────
  // 6. ABOUT IMAGE — ZOOM REVEAL + PINK BLOCK WIPE
  // ─────────────────────────────────────────────────────────────
  window.addEventListener("load", () => {
    const wrap = document.querySelector(".about-img-wrap");
    if (!wrap) return;

    // Pink block over image
    const pinkBlock = document.createElement("div");
    pinkBlock.style.cssText = `
      position:absolute; inset:0; background:var(--pink);
      transform-origin:left; z-index:5; pointer-events:none;
      will-change:transform;
    `;
    wrap.appendChild(pinkBlock);

    const img = wrap.querySelector("img");
    gsap.set(img, { scale: 1.2 }); // starts zoomed in

    ScrollTrigger.create({
      trigger: wrap,
      start: "top 78%",
      onEnter: () => {
        gsap.to(pinkBlock, { scaleX: 0, duration: 1.0, ease: "expo.inOut", delay: 0.1 });
        gsap.to(img, { scale: 1, duration: 1.4, ease: "expo.out", delay: 0.2 });
      },
      onLeaveBack: () => {
        gsap.killTweensOf([pinkBlock, img]);
        gsap.set(pinkBlock, { scaleX: 1 });
        gsap.set(img, { scale: 1.2 });
      }
    });
  });


  // ─────────────────────────────────────────────────────────────
  // 7. SECTION TITLES — CHARACTER ZOOM STAGGER
  //    Each char starts scale(0) + rotateX(-90deg) and springs in
  // ─────────────────────────────────────────────────────────────
  window.addEventListener("load", () => {
    document.querySelectorAll(".section-title .reveal-word, .about-heading .reveal-word").forEach(word => {
      const text = word.textContent.trim();
      if (!text) return;

      word.innerHTML = text.split("").map(ch => {
        if (ch === " ") return `<span style="display:inline-block;width:.28em"> </span>`;
        return `<span class="char-wrap"><em class="char-inner">${ch}</em></span>`;
      }).join("");

      const chars = word.querySelectorAll(".char-inner");
      gsap.set(chars, { y: "100%", scale: 0.6, opacity: 0, rotateX: -60 });

      ScrollTrigger.create({
        trigger: word,
        start: "top 88%",
        onEnter: () => {
          gsap.to(chars, { y: "0%", scale: 1, opacity: 1, rotateX: 0, duration: 0.75, ease: "back.out(1.6)", stagger: 0.028 });
        },
        onLeaveBack: () => {
          gsap.killTweensOf(chars);
          gsap.set(chars, { y: "100%", scale: 0.6, opacity: 0, rotateX: -60 });
        }
      });
    });
  });


  // ─────────────────────────────────────────────────────────────
  // 8. FOOTER — SCALE-UP REVEAL
  // ─────────────────────────────────────────────────────────────
  window.addEventListener("load", () => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    gsap.set(footer, { scale: 0.94, opacity: 0, transformOrigin: "top center" });

    ScrollTrigger.create({
      trigger: footer,
      start: "top 90%",
      toggleActions: "play none none reverse",
      onEnter: () => {
        gsap.to(footer, {
          scale: 1,
          opacity: 1,
          duration: 1.1,
          ease: "expo.out"
        });
      }
    });
  });


  // ─────────────────────────────────────────────────────────────
  // 9. SCROLL-SCRUB PARALLAX ZOOM on hero image/marquee
  //    Hero marquee zooms OUT as you scroll down (depth illusion)
  // ─────────────────────────────────────────────────────────────
  window.addEventListener("load", () => {
    const marquee = document.querySelector(".hero-marquee-wrap");
    if (!marquee) return;

    gsap.to(marquee, {
      scale: 0.75,
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: 1
      }
    });
  });


  // ─────────────────────────────────────────────────────────────
  // 10. SECTION LABELS — zoom + fade
  // ─────────────────────────────────────────────────────────────
  window.addEventListener("load", () => {
    document.querySelectorAll(".section-label").forEach(label => {
      gsap.set(label, { opacity: 0, scale: 0.8, x: -12 });

      ScrollTrigger.create({
        trigger: label,
        start: "top 88%",
        toggleActions: "play none none reverse",
        onEnter: () => {
          gsap.to(label, {
            opacity: 1,
            scale: 1,
            x: 0,
            duration: 0.7,
            ease: "back.out(1.8)"
          });
        }
      });
    });
  });


  // ─────────────────────────────────────────────────────────────
  // 11. NAV LINKS — vertical slide-swap hover
  // ─────────────────────────────────────────────────────────────
  document.querySelectorAll(".nav-link").forEach(link => {
    const originalText = link.textContent.trim();
    link.innerHTML = `
      <span class="nl-front">${originalText}</span>
      <span class="nl-back">${originalText}</span>
    `;
  });


  // ─────────────────────────────────────────────────────────────
  // 12. CTA BUTTON — hover zoom pulse
  // ─────────────────────────────────────────────────────────────
  document.querySelectorAll(".cta-btn").forEach(btn => {
    btn.addEventListener("mouseenter", () => {
      gsap.to(btn, { scale: 1.04, duration: 0.3, ease: "back.out(2)" });
    });
    btn.addEventListener("mouseleave", () => {
      gsap.to(btn, { scale: 1, duration: 0.4, ease: "expo.out" });
    });
  });


  // ─────────────────────────────────────────────────────────────
  // 13. PROJECT ITEM HOVER — micro-zoom
  // ─────────────────────────────────────────────────────────────
  window.addEventListener("load", () => {
    document.querySelectorAll(".project-item").forEach(item => {
      item.addEventListener("mouseenter", () => {
        if (item.classList.contains("open")) return;
        gsap.to(item, { scale: 1.012, duration: 0.35, ease: "power2.out" });
      });
      item.addEventListener("mouseleave", () => {
        gsap.to(item, { scale: 1, duration: 0.45, ease: "expo.out" });
      });
    });
  });


  // ─────────────────────────────────────────────────────────────
  // 14. DROPDOWN OPEN — content zooms in from slightly below
  // ─────────────────────────────────────────────────────────────
  // Patch: wrap original openDropdown logic via MutationObserver
  const observer = new MutationObserver(mutations => {
    mutations.forEach(m => {
      if (m.type === "attributes" && m.attributeName === "class") {
        const dropdown = m.target;
        if (dropdown.classList.contains("open")) {
          const info = dropdown.querySelector(".dropdown-info");
          const visual = dropdown.querySelector(".dropdown-visual");
          if (info) {
            gsap.fromTo(info, { scale: 0.9, opacity: 0, y: 24 },
              { scale: 1, opacity: 1, y: 0, duration: 0.7, ease: "expo.out", delay: 0.2 });
          }
          if (visual) {
            gsap.fromTo(visual, { scale: 0.88, opacity: 0, y: 24 },
              { scale: 1, opacity: 1, y: 0, duration: 0.7, ease: "expo.out", delay: 0.3 });
          }
        }
      }
    });
  });

  document.querySelectorAll(".project-dropdown").forEach(d => {
    observer.observe(d, { attributes: true });
  });


  // ─────────────────────────────────────────────────────────────
  // 15. ABOUT SECTION — statement paragraph zoom in
  // ─────────────────────────────────────────────────────────────
  window.addEventListener("load", () => {
    const stmt = document.querySelector(".about-statement");
    if (stmt) {
      gsap.set(stmt, { scale: 0.92, opacity: 0, y: 20 });
      ScrollTrigger.create({
        trigger: stmt,
        start: "top 85%",
        toggleActions: "play none none reverse",
        onEnter: () => {
          gsap.to(stmt, { scale: 1, opacity: 1, y: 0, duration: 1, ease: "expo.out" });
        }
      });
    }

    document.querySelectorAll(".about-details p").forEach((p, i) => {
      gsap.set(p, { scale: 0.9, opacity: 0, y: 16 });
      ScrollTrigger.create({
        trigger: p,
        start: "top 87%",
        toggleActions: "play none none reverse",
        onEnter: () => {
          gsap.to(p, { scale: 1, opacity: 1, y: 0, duration: 0.8, ease: "expo.out", delay: i * 0.1 });
        }
      });
    });

    const tags = document.querySelector(".about-tags");
    if (tags) {
      gsap.set(tags, { scale: 0.88, opacity: 0 });
      ScrollTrigger.create({
        trigger: tags, start: "top 88%", toggleActions: "play none none reverse",
        onEnter: () => gsap.to(tags, { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.5)" })
      });
    }

    const socials = document.querySelector(".about-socials");
    if (socials) {
      gsap.set(socials, { scale: 0.85, opacity: 0 });
      ScrollTrigger.create({
        trigger: socials, start: "top 88%", toggleActions: "play none none reverse",
        onEnter: () => gsap.to(socials, { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.5)", delay: 0.1 })
      });
    }
  });

})();