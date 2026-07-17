document.addEventListener('DOMContentLoaded', () => {

  // Header shadow on scroll
  const header = document.querySelector('.site-header');
  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 30);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile menu
  const burger = document.querySelector('.burger');
  const panel = document.querySelector('.mobile-panel');
  const toggleMenu = (open) => {
    burger.classList.toggle('is-open', open);
    panel.classList.toggle('is-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  };
  burger.addEventListener('click', () => toggleMenu(!panel.classList.contains('is-open')));
  panel.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggleMenu(false)));

  // Scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));

  // Lightbox gallery
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = lightbox.querySelector('img');
  const lightboxCap = lightbox.querySelector('.lightbox-cap');
  const closeBtn = lightbox.querySelector('.lightbox-close');

  const openLightbox = (item, capSelector) => {
    const img = item.querySelector('img');
    const cap = capSelector ? item.querySelector(capSelector) : null;
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCap.textContent = cap ? cap.textContent : img.alt;
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };

  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => openLightbox(item, '.cap'));
  });

  document.querySelectorAll('.produto-card').forEach(item => {
    item.addEventListener('click', () => openLightbox(item, '.produto-card-text h3'));
  });

  const closeLightbox = () => {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
  };
  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

  // Footer year
  const yearEl = document.querySelector('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
