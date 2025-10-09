// typewriter function
function typeWriterEffect(elementId, text, speed = 150, callback) {
  const target = document.getElementById(elementId);
  let i = 0;

  function type() {
    if (i < text.length) {
      target.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else if (callback) {
      callback(); // start the next one
    }
  }

  target.textContent = ""; // reset text if reused
  type();
}

// typewriter reveal
function stagedTypewriter(elements) {
  let index = 0;

  function next() {
    if (index < elements.length) {
      const { id, text, speed } = elements[index];
      typeWriterEffect(id, text, speed, next);
      index++;
    }
  }

  next(); 
}

// Run on homepage load
document.addEventListener("DOMContentLoaded", function () {
  stagedTypewriter([
    { id: "typewriter", text: "Advance", speed: 100 },
    { id: "quote", text: "The mark of a leader.", speed: 50 },
    { id: "welcome", text: "Welcome to the revived site!", speed: 50 },
    { id: "mission", text: "Advance is where we are paving the way for tomorrow's leaders!", speed: 50 }
  ]);
  //banner motion
  // initialize marquee duration if present
  var marqueeInner = document.querySelector('.marquee__inner');
  if (marqueeInner && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // compute width and set duration so speed is approx 80px/sec
    var container = marqueeInner.parentElement;
    function setMarqueeDuration() {
      var totalWidth = marqueeInner.scrollWidth / 2; // content duplicates
      var speed = 160; // pixels per second
      var duration = Math.max(6, Math.ceil(totalWidth / speed));
      marqueeInner.style.animationDuration = duration + 's';
    }
    setMarqueeDuration();
    window.addEventListener('resize', debounce(setMarqueeDuration, 150));
  }
});




/* Mobile Navigation */

// Navbar mobile toggle and active-link highlighting + events carousel
document.addEventListener('DOMContentLoaded', function () {
  var navToggle = document.querySelector('.nav-toggle');
  var siteNav = document.querySelector('.site-nav');

  function normalizePath(path) {
    if (!path) return 'index.html';
    // remove query and hash, strip trailing slash
    path = path.split('?')[0].split('#')[0].replace(/\/$/, '');
    var base = path.split('/').pop();
    return base || 'index.html';
  }

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', function (e) {
      var expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      siteNav.classList.toggle('open');
      if (!expanded) {
        // optionally move focus to first link for accessibility
        var first = siteNav.querySelector('a');
        if (first) first.focus();
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
      if (!siteNav.contains(e.target) && !navToggle.contains(e.target)) {
        siteNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && siteNav.classList.contains('open')) {
        siteNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });
  }

  // Highlight active link based on current path (more robust)
  var links = document.querySelectorAll('.site-nav a');
  var current = normalizePath(window.location.pathname);
  links.forEach(function (a) {
    var href = a.getAttribute('href');
    try {
      var hrefPath = new URL(href, window.location.href).pathname;
      if (normalizePath(hrefPath) === current) {
        a.classList.add('active');
      }
    } catch (err) {
      // ignore malformed hrefs
    }
    // close menu when any nav link is clicked (mobile UX)
    a.addEventListener('click', function () {
      if (siteNav) {
        siteNav.classList.remove('open');
        if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Events carousel rendering (if events-data.js provided window.EVENTS)
  if (window.EVENTS && Array.isArray(window.EVENTS) && window.EVENTS.length) {
    var carousel = document.querySelector('.events-carousel');
    var prevBtn = document.querySelector('.carousel-prev');
    var nextBtn = document.querySelector('.carousel-next');
    // aria-live region for carousel announcements (screen readers)
    var carouselAnnouncer = document.createElement('div');
    carouselAnnouncer.className = 'sr-only carousel-announcer';
    carouselAnnouncer.setAttribute('aria-live', 'polite');
    carouselAnnouncer.setAttribute('aria-atomic', 'true');
    if (carousel) carousel.appendChild(carouselAnnouncer);
    if (carousel) {
      // render items
      window.EVENTS.forEach(function (ev, idx) {
        var item = document.createElement('article');
        item.className = 'event-item';
        item.setAttribute('role', 'listitem');
        // normalize path separators to forward slashes (in case data used Windows paths)
        var flyerSrc = (ev.flyer || '').replace(/\\\\/g, '/');
        // include a clear, focusable button to open the lightbox (accessibility)
        item.innerHTML = '\n          <div class="event-flyer-wrap">\n            <img src="' + flyerSrc + '" alt="' + (ev.title || 'Event flyer') + '">\n          </div>\n          <div class="event-meta">\n            <h3>' + (ev.title || '') + '</h3>\n            <time>' + (ev.date || '') + '</time>\n            <p>' + (ev.description || '') + '</p>\n            <button class="view-flyer-btn" type="button" data-index="' + idx + '" aria-label="View flyer for ' + (ev.title || '') + '">View flyer</button>\n          </div>\n        ';
        carousel.appendChild(item);
      });

      // basic navigation helpers
      function scrollNext() {
        var w = carousel.clientWidth;
        carousel.scrollBy({ left: w * 0.9, behavior: 'smooth' });
      }
      function scrollPrev() {
        var w = carousel.clientWidth;
        carousel.scrollBy({ left: -w * 0.9, behavior: 'smooth' });
      }

      if (nextBtn) nextBtn.addEventListener('click', scrollNext);
      if (prevBtn) prevBtn.addEventListener('click', scrollPrev);

      // keyboard nav for carousel
      carousel.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight') scrollNext();
        if (e.key === 'ArrowLeft') scrollPrev();
      });

      // announce slide position when scrolling (basic)
      var lastAnnounced = -1;
      function announceVisible() {
        var items = carousel.querySelectorAll('.event-item');
        items.forEach(function (it, idx) {
          var rect = it.getBoundingClientRect();
          var cRect = carousel.getBoundingClientRect();
          // item is considered visible if its left is within carousel viewport
          if (rect.left >= cRect.left - 5 && rect.left < cRect.right - 5) {
            if (lastAnnounced !== idx) {
              lastAnnounced = idx;
              var title = it.querySelector('.event-meta h3')?.textContent || '';
              if (carouselAnnouncer) carouselAnnouncer.textContent = 'Slide ' + (idx + 1) + ' of ' + items.length + (title ? (': ' + title) : '');
            }
          }
        });
      }
      carousel.addEventListener('scroll', debounce(announceVisible, 150));
      // initial announce
      setTimeout(announceVisible, 300);
    }
  }

  // Render full events list on Events page (if present)
  var eventsListContainer = document.querySelector('.events-list');
  if (eventsListContainer && window.EVENTS && Array.isArray(window.EVENTS)) {
    // clear any placeholder content
    eventsListContainer.innerHTML = '';
    window.EVENTS.forEach(function (ev, idx) {
      var section = document.createElement('section');
      section.className = 'event-full';
      section.innerHTML = '\n        <div class="event-full-inner container">\n          <div class="event-flyer-wrap">\n            <img src="' + ev.flyer + '" alt="' + (ev.title || 'Event flyer') + '">\n          </div>\n          <div class="event-meta">\n            <h3>' + (ev.title || '') + '</h3>\n            <time>' + (ev.date || '') + '</time>\n            <p>' + (ev.description || '') + '</p>\n          </div>\n        </div>\n      ';
      eventsListContainer.appendChild(section);
    });
  }
});

// small debounce helper
function debounce(fn, wait) {
  var t;
  return function () {
    var args = arguments;
    clearTimeout(t);
    t = setTimeout(function () { fn.apply(null, args); }, wait);
  };
}

/* Lightbox for full-size flyers */
(function () {
  function createLightbox() {
    var overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-hidden', 'true');

    overlay.innerHTML = '\n+      <div class="lightbox-content">\n+        <button class="lightbox-close" aria-label="Close">✕</button>\n+        <button class="lightbox-prev" aria-label="Previous">◀</button>\n+        <img class="lightbox-image" src="" alt="">\n+        <button class="lightbox-next" aria-label="Next">▶</button>\n+        <div class="lightbox-caption"></div>\n+      </div>\n+    ';

    document.body.appendChild(overlay);
    return overlay;
  }

  var overlay = createLightbox();
  var imgEl = overlay.querySelector('.lightbox-image');
  var captionEl = overlay.querySelector('.lightbox-caption');
  var closeBtn = overlay.querySelector('.lightbox-close');
  var prevBtn = overlay.querySelector('.lightbox-prev');
  var nextBtn = overlay.querySelector('.lightbox-next');

  var items = []; // {src, alt, caption}
  var current = 0;
  var lastOpener = null;

  function openAt(index) {
    if (!items.length) return;
    current = (index + items.length) % items.length;
    var it = items[current];
    // prefer full-size source for the lightbox when available
    imgEl.src = it.full || it.src;
    imgEl.alt = it.alt || '';
    captionEl.textContent = it.caption || '';
    overlay.setAttribute('aria-hidden', 'false');
    overlay.classList.add('open');
    overlay.dataset.count = items.length;
    // focus management: save last opener and move focus into lightbox
    try { lastOpener = document.activeElement; } catch (e) { lastOpener = null; }
    closeBtn.focus();
    trapFocus(overlay);
  }

  function closeLightbox() {
    overlay.setAttribute('aria-hidden', 'true');
    overlay.classList.remove('open');
    imgEl.src = '';
    releaseFocusTrap();
    // restore focus to the element that opened the lightbox
    if (lastOpener && typeof lastOpener.focus === 'function') {
      lastOpener.focus();
      lastOpener = null;
    }
  }

  function prev() { openAt(current - 1); }
  function next() { openAt(current + 1); }

  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', prev);
  nextBtn.addEventListener('click', next);

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeLightbox();
  });

  document.addEventListener('keydown', function (e) {
    if (overlay.classList.contains('open')) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    }
  });

  // gather images on page: flyers inside .events-carousel and .events-list
  function registerGallery() {
    items = [];
    // Use the View Flyer buttons to open the lightbox (buttons are rendered with data-index)
    var buttons = document.querySelectorAll('.view-flyer-btn');
    buttons.forEach(function (btn, i) {
      // derive related image info
      var itemEl = btn.closest('.event-item') || btn.closest('.event-full');
      var img = itemEl ? itemEl.querySelector('.event-flyer-wrap img') : null;
      var src = img ? (img.getAttribute('src') || '') : '';
      var alt = img ? img.alt || '' : '';
      var caption = itemEl ? itemEl.querySelector('.event-meta h3')?.textContent : '';
      var full = img && img.dataset.full ? img.dataset.full : null;
      if (!full && window.EVENTS) {
        var norm = src.replace(/\\\\/g, '/');
        var found = window.EVENTS.find(function (e) { return (e.flyer || '').replace(/\\\\/g, '/') === norm || (e.full || '').replace(/\\\\/g, '/') === norm; });
        if (found) full = (found.full || found.flyer || '').replace(/\\\\/g, '/');
      }
      items.push({ src: src, alt: alt, caption: caption, full: full });
      btn.addEventListener('click', function () { openAt(i); });
      // ensure button accessible state
      btn.setAttribute('type', 'button');
    });
  }

  // initialize after DOM ready and also after dynamic render
  document.addEventListener('DOMContentLoaded', registerGallery);
  // also expose a small API for re-registering if images change
  window.LIGHTBOX = { register: registerGallery, openAt: openAt };
})();

// (dynamic footer spacer removed per user request)

// Focus trap helpers used by the lightbox
var _focusTrap = null;
function trapFocus(container) {
  releaseFocusTrap();
  if (!container) return;
  var focusable = container.querySelectorAll('a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])');
  focusable = Array.prototype.slice.call(focusable).filter(function (el) { return !el.hasAttribute('disabled'); });
  if (!focusable.length) return;
  var first = focusable[0];
  var last = focusable[focusable.length - 1];
  function keyHandler(e) {
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    }
  }
  _focusTrap = keyHandler;
  document.addEventListener('keydown', keyHandler);
}

function releaseFocusTrap() {
  if (_focusTrap) {
    document.removeEventListener('keydown', _focusTrap);
    _focusTrap = null;
  }
}

/* Join form -> Google Sheets helper */
;(function () {
  var GOOGLE_SHEETS_WEBAPP_URL = 'https://script.google.com/macros/s/AKfycbziC_PbD3YiG0cHWLy2BNRICKWILQt0lIq1VWWiVT_SRVsnFq-I7MS0-twJHx_Vwbe_/exec'; 
  var form = document.getElementById('joinForm');
  if (!form) return; // nothing to do on pages without the form

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var msgEl = document.getElementById('joinFormMsg');
    msgEl.textContent = 'Sending...';
    var fd = new FormData(form);
    var payload = {};
    fd.forEach(function (v, k) { payload[k] = v; });

    fetch(GOOGLE_SHEETS_WEBAPP_URL, {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).then(function (res) {
      if (!res.ok) throw new Error('Network response was not ok');
      return res.json().catch(function () { return {}; });
    }).then(function (data) {
      msgEl.textContent = 'Thanks — your membership request was received.';
      form.reset();
    }).catch(function (err) {
      console.error('Join form submit error:', err);
      msgEl.textContent = 'Sorry — there was a problem sending the form. Please try again later.';
    });
  });
})();
