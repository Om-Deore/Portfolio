/* ======================================================
   Om Deore — Portfolio JS
   ====================================================== */

(function () {
  'use strict';

  /* --- NAV: sticky shadow + hamburger --- */
  const nav = document.getElementById('nav');
  const hamburger = document.getElementById('hamburger');
  const navMobile = document.getElementById('nav-mobile');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  });

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navMobile.classList.toggle('open');
  });

  // Close mobile menu on link click
  document.querySelectorAll('.mob-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navMobile.classList.remove('open');
    });
  });

  /* --- SMOOTH SCROLL for nav links --- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = document.getElementById('nav').offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* --- SCROLL REVEAL --- */
  const revealEls = document.querySelectorAll('.reveal, .skill-card, .project-card, .gallery-item, .contact-card, .github-stat-box');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger based on sibling index
        const siblings = Array.from(entry.target.parentElement.children);
        const idx = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = (idx * 80) + 'ms';
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  // Add reveal class to cards/items
  document.querySelectorAll('.skill-card, .project-card, .gallery-item, .contact-card, .github-stat-box').forEach(el => {
    el.classList.add('reveal');
  });

  revealEls.forEach(el => observer.observe(el));
  // Re-observe newly classed elements
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  /* --- ACTIVE NAV LINK --- */
  const sections = document.querySelectorAll('section[id]');
  const navLinksAll = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinksAll.forEach(a => {
          a.style.color = '';
          if (a.getAttribute('href') === '#' + entry.target.id) {
            a.style.color = 'var(--accent)';
          }
        });
      }
    });
  }, { threshold: 0.45 });

  sections.forEach(s => sectionObserver.observe(s));

  /* --- GALLERY: image placeholder fill --- */
  document.querySelectorAll('.gallery-item img, .project-img').forEach(img => {
    img.addEventListener('error', function () {
      this.parentElement.classList.add('img-placeholder');
      this.style.display = 'none';
    });
    // If already broken (cached)
    if (!img.complete || img.naturalWidth === 0) {
      img.dispatchEvent(new Event('error'));
    }
  });

  /* --- HERO: subtle parallax on grid --- */
  const heroBgGrid = document.querySelector('.hero-bg-grid');
  if (heroBgGrid) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      heroBgGrid.style.transform = `translateY(${y * 0.25}px)`;
    }, { passive: true });
  }

  /* --- Animate hero on load (with guaranteed fallback) --- */
  function triggerHeroReveal() {
    document.querySelectorAll('.hero .reveal').forEach((el, i) => {
      el.style.transitionDelay = (i * 120) + 'ms';
      el.classList.add('visible');
    });
    setTimeout(() => {
      document.querySelectorAll('.hero .reveal').forEach(el => {
        el.style.transitionDelay = '';
      });
    }, 1200);
  }

  // Fire on load, but guarantee it fires within 300ms no matter what
  window.addEventListener('load', triggerHeroReveal);
  setTimeout(triggerHeroReveal, 300);

})();
