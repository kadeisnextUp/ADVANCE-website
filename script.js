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
    if (carousel) {
      // render items
      window.EVENTS.forEach(function (ev) {
        var item = document.createElement('article');
        item.className = 'event-item';
        item.setAttribute('role', 'listitem');
        item.innerHTML = '\n          <div class="event-flyer-wrap">\n            <img src="' + ev.flyer + '" alt="' + (ev.title || 'Event flyer') + '">\n          </div>\n          <div class="event-meta">\n            <h3>' + (ev.title || '') + '</h3>\n            <time>' + (ev.date || '') + '</time>\n            <p>' + (ev.description || '') + '</p>\n          </div>\n        ';
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
    }
  }

  // Render full events list on Events page (if present)
  var eventsListContainer = document.querySelector('.events-list');
  if (eventsListContainer && window.EVENTS && Array.isArray(window.EVENTS)) {
    // clear any placeholder content
    eventsListContainer.innerHTML = '';
    window.EVENTS.forEach(function (ev) {
      var section = document.createElement('section');
      section.className = 'event-full';
      section.innerHTML = '\n        <div class="event-full-inner container">\n          <div class="event-flyer-wrap">\n            <img src="' + ev.flyer + '" alt="' + (ev.title || 'Event flyer') + '">\n          </div>\n          <div class="event-meta">\n            <h3>' + (ev.title || '') + '</h3>\n            <time>' + (ev.date || '') + '</time>\n            <p>' + (ev.description || '') + '</p>\n          </div>\n        </div>\n      ';
      eventsListContainer.appendChild(section);
    });
  }
});
