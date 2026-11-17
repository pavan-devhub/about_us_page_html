/*
 * FEED MSCS Ltd. — About Us
 * Progressive enhancement only: without JavaScript every section is still
 * readable (all "Read more" panels stay open and the index links still jump).
 *
 * 1. "Read more" / "Read less" panels
 * 2. "On This Page" index: highlights the section being read and keeps the
 *    active chip in view on phones/tablets
 */
(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------------
   * 1. Read more panels
   * ------------------------------------------------------------------ */
  function initReadMore() {
    var buttons = document.querySelectorAll('.read-more[aria-controls]');

    Array.prototype.forEach.call(buttons, function (button) {
      var panel = document.getElementById(button.getAttribute('aria-controls'));
      if (!panel) return;
      var label = button.querySelector('.read-more__label');

      function setOpen(open) {
        button.setAttribute('aria-expanded', String(open));
        panel.setAttribute('data-open', String(open));
        // Closed panels can't be tabbed into or read out.
        if (open) panel.removeAttribute('inert');
        else panel.setAttribute('inert', '');
        if (label) label.textContent = open ? 'Read less' : 'Read more';
      }

      setOpen(false);

      button.addEventListener('click', function () {
        setOpen(button.getAttribute('aria-expanded') !== 'true');
      });
    });
  }

  /* ------------------------------------------------------------------
   * 2. "On This Page" active section
   * ------------------------------------------------------------------ */
  function initToc() {
    var toc = document.querySelector('.toc');
    if (!toc) return;

    var list = toc.querySelector('.toc__list');
    var links = Array.prototype.slice.call(toc.querySelectorAll('.toc__link'));
    var sections = links
      .map(function (link) { return document.getElementById(link.hash.slice(1)); })
      .filter(Boolean);
    if (!sections.length) return;

    var activeId = null;

    function setActive(id) {
      if (id === activeId) return;
      activeId = id;

      var activeLink = null;
      links.forEach(function (link) {
        var isActive = link.hash === '#' + id;
        link.classList.toggle('is-active', isActive);
        if (isActive) {
          link.setAttribute('aria-current', 'location');
          activeLink = link;
        } else {
          link.removeAttribute('aria-current');
        }
      });

      // Sideways chip bar (phones/tablets): keep the active chip centred.
      // Only the bar is scrolled, never the page.
      if (activeLink && list && list.scrollWidth > list.clientWidth) {
        var left = activeLink.offsetLeft - (list.clientWidth - activeLink.offsetWidth) / 2;
        list.scrollTo({ left: left, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      }
    }

    // Highlight straight away when a link is clicked.
    links.forEach(function (link) {
      link.addEventListener('click', function () {
        setActive(link.hash.slice(1));
      });
    });

    setActive(sections[0].id);

    if (!('IntersectionObserver' in window)) return;

    // The section crossing a thin band about a third of the way down the
    // window is the one being read.
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-32% 0px -64% 0px' }
    );
    sections.forEach(function (section) { observer.observe(section); });

    // At the very bottom of the page the last section wins, since it may be
    // too short to reach the band.
    var lastId = sections[sections.length - 1].id;
    window.addEventListener(
      'scroll',
      function () {
        var atBottom =
          window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
        if (atBottom) setActive(lastId);
      },
      { passive: true }
    );
  }

  initReadMore();
  initToc();
})();
