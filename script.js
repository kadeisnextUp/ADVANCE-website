/* ---------- Typewriter for home ---------- */
function typeWriterEffect(id, text, speed = 50, done) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = '';
  let i = 0;
  (function type() {
    if (i < text.length) {
      el.textContent += text.charAt(i++);
      setTimeout(type, speed);
    } else if (done) done();
  })();
}
function stagedTypewriter(list) {
  let k = 0;
  (function next() {
    if (k >= list.length) return;
    const { id, text, speed } = list[k++];
    typeWriterEffect(id, text, speed || 50, next);
  })();
}

/* ---------- Marquee speed ---------- */
function debounce(fn, wait) {
  let t; return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), wait); };
}
function initMarquee() {
  const inner = document.querySelector('.marquee__inner');
  if (!inner || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  function setDur() {
    const total = inner.scrollWidth / 2; // duplicated content
    const pxPerSec = 160;
    const dur = Math.max(6, Math.ceil(total / pxPerSec));
    inner.style.animationDuration = dur + 's';
  }
  setDur();
  window.addEventListener('resize', debounce(setDur, 150));
}

/* ---------- Mobile nav + active link ---------- */
function normalizePath(path) {
  if (!path) return 'index.html';
  path = path.split('?')[0].split('#')[0].replace(/\/$/, '');
  const base = path.split('/').pop();
  return base || 'index.html';
}
function initNav() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const exp = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!exp));
      nav.classList.toggle('open');
      if (!exp) {
        const first = nav.querySelector('a');
        if (first) first.focus();
      }
    });
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }
  const links = document.querySelectorAll('.site-nav a');
  const current = normalizePath(window.location.pathname);
  links.forEach((a) => {
    try {
      const p = new URL(a.getAttribute('href'), window.location.href).pathname;
      if (normalizePath(p) === current) a.classList.add('active');
    } catch (_) {}
    a.addEventListener('click', () => {
      if (nav && toggle) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

/* ---------- Home: render simple event cards (no arrows/lightbox) ---------- */
function initHomeCarousel() {
  const wrap = document.querySelector('.events-carousel');
  if (!wrap || !Array.isArray(window.EVENTS)) return;
  window.EVENTS.forEach((ev) => {
    const art = document.createElement('article');
    art.className = 'event-item';
    const flyer = (ev.flyer || '').replace(/\\/g, '/');
    art.innerHTML = `
      <div class="event-flyer-wrap"><img src="${flyer}" alt="${ev.title || 'Event flyer'}"></div>
      <div class="event-meta">
        <h3>${ev.title || ''}</h3>
        <time>${ev.date || ''}</time>
        <p>${ev.description || ''}</p>
      </div>
    `;
    wrap.appendChild(art);
  });
}

/* ---------- Lordicon accent colors ---------- */
function applyAccentToIcons() {
  const root = document.body || document.documentElement;
  const bg = getComputedStyle(root).getPropertyValue('--bg').trim();
  const accent = getComputedStyle(root).getPropertyValue('--accent').trim();
  document.querySelectorAll('lord-icon').forEach(icon => {
    icon.setAttribute('colors', `primary:${bg},secondary:${accent}`);
  });
}

/* ---------- Init on DOM ready ---------- */
document.addEventListener('DOMContentLoaded', () => {
  // homepage typewriter (safe if IDs aren’t present)
  stagedTypewriter([
    { id: 'typewriter', text: 'Advance', speed: 400 },
    { id: 'quote', text: 'The mark of a leader.' },
    { id: 'welcome', text: 'Welcome to the revived site!' },
    { id: 'mission', text: "Advance is where we are paving the way for tomorrow's leaders!" }
  ]);

  initMarquee();
  initNav();
  initHomeCarousel();
  applyAccentToIcons();
});
