/* ═══════════════════════════════════════════
   GIANG FASHION — Main JS
   ═══════════════════════════════════════════ */

// ─── Loader ───
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (loader) {
    setTimeout(() => loader.classList.add('hidden'), 1800);
    setTimeout(() => { loader.remove(); document.body.style.overflow = ''; }, 2400);
  }
  document.body.style.overflow = 'hidden';
});

// ─── Custom Cursor ───
const cursor = document.querySelector('.cursor');
const cursorRing = document.querySelector('.cursor-ring');

if (cursor && cursorRing && window.matchMedia('(pointer: fine)').matches) {
  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX; mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll('a, button, .collection-card, .lookbook-item, .gallery-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width = '6px';
      cursor.style.height = '6px';
      cursorRing.style.width = '56px';
      cursorRing.style.height = '56px';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width = '10px';
      cursor.style.height = '10px';
      cursorRing.style.width = '36px';
      cursorRing.style.height = '36px';
    });
  });
}

// ─── Navigation Scroll ───
const nav = document.querySelector('.nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });
}

// ─── Hamburger Menu ───
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.querySelector('span:nth-child(1)').style.transform = isOpen ? 'rotate(45deg) translate(4px, 4px)' : '';
    hamburger.querySelector('span:nth-child(2)').style.opacity = isOpen ? '0' : '';
    hamburger.querySelector('span:nth-child(3)').style.transform = isOpen ? 'rotate(-45deg) translate(4px, -4px)' : '';
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ─── Scroll Reveal ───
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach(el => observer.observe(el));
}

// ─── Hero Ken Burns ───
const heroBg = document.querySelector('.hero');
if (heroBg) {
  setTimeout(() => heroBg.classList.add('loaded'), 100);
}

// ─── Collection Detail Hero ───
const detailHero = document.querySelector('.collection-detail-hero');
if (detailHero) {
  setTimeout(() => detailHero.classList.add('loaded'), 100);
}

// ─── Lookbook Horizontal Scroll Drag ───
const lookbookScroll = document.querySelector('.lookbook-scroll');
if (lookbookScroll) {
  let isDown = false, startX, scrollLeft;

  lookbookScroll.addEventListener('mousedown', e => {
    isDown = true;
    startX = e.pageX - lookbookScroll.offsetLeft;
    scrollLeft = lookbookScroll.scrollLeft;
  });

  lookbookScroll.addEventListener('mouseleave', () => isDown = false);
  lookbookScroll.addEventListener('mouseup', () => isDown = false);
  lookbookScroll.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - lookbookScroll.offsetLeft;
    const walk = (x - startX) * 1.5;
    lookbookScroll.scrollLeft = scrollLeft - walk;
  });
}

// ─── Lightbox ───
function createLightbox() {
  const lb = document.createElement('div');
  lb.id = 'lightbox';
  lb.style.cssText = `
    position:fixed;inset:0;background:rgba(0,0,0,0.95);z-index:10000;
    display:flex;align-items:center;justify-content:center;
    opacity:0;transition:opacity 0.3s ease;cursor:zoom-out;
  `;
  lb.innerHTML = `
    <img style="max-width:90vw;max-height:90vh;object-fit:contain;transform:scale(0.95);transition:transform 0.3s ease;" />
    <button style="position:absolute;top:24px;right:32px;background:none;border:none;color:#C9A84C;font-size:32px;cursor:pointer;font-family:serif;line-height:1;">✕</button>
  `;
  document.body.appendChild(lb);

  lb.addEventListener('click', e => {
    if (e.target === lb || e.target.tagName === 'BUTTON') closeLightbox(lb);
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox(lb);
  });

  return lb;
}

function openLightbox(src) {
  let lb = document.getElementById('lightbox') || createLightbox();
  const img = lb.querySelector('img');
  img.src = src.replace('w=800', 'w=1600').replace('w=1200', 'w=1800');
  lb.style.display = 'flex';
  requestAnimationFrame(() => {
    lb.style.opacity = '1';
    img.style.transform = 'scale(1)';
  });
  document.body.style.overflow = 'hidden';
}

function closeLightbox(lb) {
  lb.style.opacity = '0';
  lb.querySelector('img').style.transform = 'scale(0.95)';
  setTimeout(() => { lb.style.display = 'none'; document.body.style.overflow = ''; }, 300);
}

document.querySelectorAll('.lookbook-full, .gallery-item').forEach(el => {
  el.addEventListener('click', () => {
    const img = el.querySelector('img');
    if (img) openLightbox(img.src);
  });
});

// ─── Counter Animation ───
function animateCounter(el, target) {
  const duration = 2000;
  const start = performance.now();
  const update = (time) => {
    const progress = Math.min((time - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(ease * target) + (el.dataset.suffix || '');
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

const counters = document.querySelectorAll('[data-count]');
if (counters.length) {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target, parseInt(entry.target.dataset.count));
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => counterObserver.observe(el));
}

// ─── Language Switch ───
document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const url = new URL(window.location.href);
    url.searchParams.set('lang', btn.dataset.lang);
    window.location.href = url.toString();
  });
});
