(function () {
  'use strict';

  /* ---------- Navbar scroll state ---------- */
  var nav = document.querySelector('.nav');
  if (nav) {
    var onScroll = function () {
      nav.classList.toggle('scrolled', window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Mobile menu ---------- */
  var burger = document.querySelector('.nav-hamburger');
  var linksWrapper = document.querySelector('.nav-links-wrapper');
  if (burger && linksWrapper) {
    burger.addEventListener('click', function () {
      linksWrapper.classList.toggle('open');
    });
    linksWrapper.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        linksWrapper.classList.remove('open');
      });
    });
  }

  /* ---------- Scroll-reveal animations ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('revealed'); });
  }

  /* ---------- Animated counters (stats) ---------- */
  function animateCount(el) {
    var target = el.getAttribute('data-target');
    if (!target) return;
    var suffix = el.getAttribute('data-suffix') || '';
    var prefix = el.getAttribute('data-prefix') || '';
    var numeric = parseFloat(target);
    if (isNaN(numeric)) {
      el.textContent = prefix + target + suffix;
      return;
    }
    var duration = 1600;
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var val = (numeric * eased).toFixed(0);
      el.textContent = prefix + val + suffix;
      if (progress < 1) window.requestAnimationFrame(step);
      else el.textContent = prefix + target + suffix;
    }
    window.requestAnimationFrame(step);
  }

  var statValues = document.querySelectorAll('.stat-value[data-target]');
  if ('IntersectionObserver' in window) {
    var statObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            statObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    statValues.forEach(function (el) { statObserver.observe(el); });
  } else {
    statValues.forEach(function (el) {
      el.textContent = (el.getAttribute('data-prefix') || '') + el.getAttribute('data-target') + (el.getAttribute('data-suffix') || '');
    });
  }

  /* ---------- Services tabs ---------- */
  var tabs = document.querySelectorAll('.service-tab');
  tabs.forEach(function (tab, i) {
    tab.addEventListener('click', function () {
      var idx = tab.getAttribute('data-tab');
      var scope = tab.closest('[data-services-panel]');
      if (!scope) return;
      scope.querySelectorAll('.service-tab').forEach(function (t) {
        t.classList.remove('active');
      });
      tab.classList.add('active');
      scope.querySelectorAll('.service-content-pane').forEach(function (p) {
        p.style.display = p.getAttribute('data-pane') === idx ? 'block' : 'none';
      });
    });
  });

  /* ---------- Product slider ---------- */
  function initSlider(root) {
    var slides = root.querySelectorAll('.product-slide');
    var dots = root.querySelectorAll('.slide-dot');
    if (!slides.length) return;
    var current = 0;
    var counter = root.querySelector('.product-counter');
    function updateCounter() {
      if (counter) counter.textContent = String(current + 1).padStart(2, '0') + ' / ' + String(slides.length).padStart(2, '0');
    }
    function go(idx) {
      current = (idx + slides.length) % slides.length;
      slides.forEach(function (s, i) { s.classList.toggle('active', i === current); });
      dots.forEach(function (d, i) { d.classList.toggle('active', i === current); });
      updateCounter();
    }
    var prev = root.querySelector('.slide-prev');
    var next = root.querySelector('.slide-next');
    if (prev) prev.addEventListener('click', function () { go(current - 1); });
    if (next) next.addEventListener('click', function () { go(current + 1); });
    dots.forEach(function (d, i) {
      d.addEventListener('click', function () { go(i); });
    });
    var auto = root.getAttribute('data-auto');
    if (auto && slides.length > 1) {
      setInterval(function () { go(current + 1); }, parseInt(auto, 10) || 6000);
    }
    updateCounter();
  }
  document.querySelectorAll('[data-slider]').forEach(initSlider);

  /* ---------- Back to top ---------- */
  var backTop = document.querySelector('.back-to-top');
  if (backTop) {
    window.addEventListener('scroll', function () {
      backTop.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });
    backTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Smooth anchor offset (fixed navbar) ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var hash = anchor.getAttribute('href');
      if (hash === '#') return;
      var target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.scrollY - 56;
      window.scrollTo({ top: top, behavior: 'smooth' });
      history.replaceState(null, '', hash);
    });
  });
})();