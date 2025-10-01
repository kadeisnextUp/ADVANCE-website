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
    { id: "typewriter", text: "Advance", speed: 300 },
    { id: "quote", text: "The mark of a leader.", speed: 150 },
    { id: "welcome", text: "Welcome to the revived site!", speed: 100 },
    { id: "mission", text: "Advance is where we are paving the way for tomorrow's leaders!", speed: 120 }
  ]);
});



/* Mobile Navigation */

// Navbar mobile toggle and active-link highlighting
document.addEventListener('DOMContentLoaded', function () {
	var navToggle = document.querySelector('.nav-toggle');
	var siteNav = document.querySelector('.site-nav');

	if (navToggle && siteNav) {
		navToggle.addEventListener('click', function (e) {
			var expanded = navToggle.getAttribute('aria-expanded') === 'true';
			navToggle.setAttribute('aria-expanded', String(!expanded));
			siteNav.classList.toggle('open');
		});

		// Close menu when clicking outside
		document.addEventListener('click', function (e) {
			if (!siteNav.contains(e.target) && !navToggle.contains(e.target)) {
				siteNav.classList.remove('open');
				navToggle.setAttribute('aria-expanded', 'false');
			}
		});
	}

	// Highlight active link based on current path
	var links = document.querySelectorAll('.site-nav a');
	var current = window.location.pathname.split('/').pop() || 'index.html';
	links.forEach(function (a) {
		var href = a.getAttribute('href');
		var hrefBase = href.split('/').pop();
		if (hrefBase === current || (hrefBase === 'index.html' && current === '')) {
			a.classList.add('active');
		}
	});
});
