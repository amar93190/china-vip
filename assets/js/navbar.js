/* ============================================================
   NAVBAR — Scroll, menu mobile, smooth scroll
   ============================================================ */

(function () {
  'use strict';

  const navbar     = document.getElementById('navbar');
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const closeBtn   = document.getElementById('mobile-close');

  /* ── Navbar scroll ── */
  function onScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── Menu mobile : ouverture ── */
  function openMenu() {
    mobileMenu.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  /* ── Menu mobile : fermeture ── */
  function closeMenu() {
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', function () {
    mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
  });

  closeBtn.addEventListener('click', closeMenu);

  /* Fermeture sur clic d'un lien */
  mobileMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  /* Fermeture sur touche Escape */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) closeMenu();
  });

  /* ── Smooth scroll pour tous les liens internes ── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const id = anchor.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const offset = navbar.offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });
})();
