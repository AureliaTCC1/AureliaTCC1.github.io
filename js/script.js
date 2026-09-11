document.addEventListener('DOMContentLoaded', () => {

  const progressBar = document.getElementById('progressBar');

  function updateProgressBar() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + '%';
  }

  const nav = document.getElementById('nav');

  const heroBg = document.getElementById('heroBg');
  const hero = document.querySelector('.hero');

  function updateNavAppearance() {
    nav.classList.toggle('nav-scrolled', window.scrollY > 40);
  }

  function onScroll() {
    updateProgressBar();
    updateNavAppearance();
    updateParallax();
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Menu pra nav no celular
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.classList.toggle('is-active', isOpen);
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Revela elementos conforme entram na tela
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach((el) => revealObserver.observe(el));

  function updateParallax() {
    if (!hero || !heroBg) return;
    const rect = hero.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > window.innerHeight) return;
    const offset = window.scrollY * 0.25;
    heroBg.style.transform = `translateY(${offset}px)`;
  }

  // Cards de funcionalidades
  const featureCards = document.querySelectorAll('.feature-card');

  featureCards.forEach((card) => {
    card.addEventListener('click', () => {
      const isOpen = card.classList.contains('is-open');

      // Fecha os outros cards abertos
      featureCards.forEach((c) => {
        if (c !== card) {
          c.classList.remove('is-open');
          c.setAttribute('aria-expanded', 'false');
        }
      });

      card.classList.toggle('is-open', !isOpen);
      card.setAttribute('aria-expanded', String(!isOpen));
    });
  });

  // Destaca no menu o link da seção visível na tela
  const spyLinks = document.querySelectorAll('.nav-link[href^="#"]');
  const spyTargets = new Map(); // elemento da seção -> link correspondente

  spyLinks.forEach((link) => {
    const target = document.getElementById(link.getAttribute('href').slice(1));
    if (target) spyTargets.set(target, link);
  });

  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      spyLinks.forEach((link) => link.classList.remove('is-active'));
      spyTargets.get(entry.target)?.classList.add('is-active');
    });
  }, { rootMargin: '-45% 0px -45% 0px' }); // faixa no meio vertical da tela

  spyTargets.forEach((_link, target) => spyObserver.observe(target));

});
