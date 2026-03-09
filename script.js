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

  document.querySelectorAll('.mob-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navMobile.classList.remove('open');
    });
  });

  /* --- SMOOTH SCROLL --- */
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
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const siblings = Array.from(entry.target.parentElement.children);
        const idx = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = (idx * 80) + 'ms';
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.skill-card, .project-card, .gallery-item, .contact-card, .github-stat-box').forEach(el => {
    el.classList.add('reveal');
  });

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

  /* --- IMAGE PLACEHOLDER --- */
  document.querySelectorAll('.gallery-item img, .project-img').forEach(img => {
    img.addEventListener('error', function () {
      this.parentElement.classList.add('img-placeholder');
      this.style.display = 'none';
    });
    if (!img.complete || img.naturalWidth === 0) {
      img.dispatchEvent(new Event('error'));
    }
  });

  /* --- HERO PARALLAX --- */
  const heroBgGrid = document.querySelector('.hero-bg-grid');
  if (heroBgGrid) {
    window.addEventListener('scroll', () => {
      heroBgGrid.style.transform = `translateY(${window.scrollY * 0.25}px)`;
    }, { passive: true });
  }

  /* --- HERO REVEAL — fires at 300ms guaranteed, also on load --- */
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

  window.addEventListener('load', triggerHeroReveal);
  setTimeout(triggerHeroReveal, 300);

})();