/* ============================================================
   BASE CAMP CODE — main.js
   ============================================================ */

/* Mark <html> as JS-capable immediately — this activates the
   reveal animation CSS. Without this, all .reveal elements stay
   visible (no opacity:0) so content never disappears if JS fails. */
document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {

  /* ── Sticky nav on scroll ── */
  const nav = document.querySelector('.nav');
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── Mobile hamburger ── */
  const hamburger = document.querySelector('.nav__hamburger');
  const mobileMenu = document.querySelector('.nav__mobile');
  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });
  // Close on link click
  document.querySelectorAll('.nav__mobile a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });

  /* ── Scroll reveal (IntersectionObserver) ── */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ── Smooth scroll for nav links ── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 72;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ── Counter animation for stat cards ── */
  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const duration = 1200;
      const start = performance.now();
      const tick = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(ease * target) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(el => counterObserver.observe(el));

  /* ── Roadmap step hover highlight ── */
  document.querySelectorAll('.roadmap-step').forEach(step => {
    step.addEventListener('mouseenter', () => {
      step.style.transform = 'translateY(-4px)';
    });
    step.addEventListener('mouseleave', () => {
      step.style.transform = 'translateY(0)';
    });
  });

  /* ── Day card session accordion on mobile ── */
  if (window.innerWidth < 720) {
    document.querySelectorAll('.day-card__header').forEach(header => {
      header.style.cursor = 'pointer';
      const body = header.nextElementSibling;
      header.addEventListener('click', () => {
        const isOpen = body.style.display !== 'none';
        body.style.display = isOpen ? 'none' : 'block';
      });
    });
  }

});