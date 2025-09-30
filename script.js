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
