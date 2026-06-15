/* Minimal progressive-enhancement JS:
   1. Mobile nav toggle
   2. Cat gallery (build from a photo list) + lightbox
   The site works without JS — this only adds niceties. */

(function () {
  "use strict";

  /* ---------- mobile nav ---------- */
  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  if (header && toggle) {
    toggle.addEventListener("click", function () {
      var open = header.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    // close the menu after tapping a link
    header.querySelectorAll(".site-nav a").forEach(function (a) {
      a.addEventListener("click", function () {
        header.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- cat gallery ---------- */
  var gallery = document.querySelector(".gallery");
  if (gallery) {
    var empty = document.querySelector(".gallery-empty");
    var base = gallery.dataset.base || "images/cat/";
    var names = (gallery.dataset.photos || "")
      .split(",")
      .map(function (s) { return s.trim(); })
      .filter(Boolean);
    // Optional per-photo alt text, "|"-separated and positionally matched.
    var alts = (gallery.dataset.alts || "")
      .split("|")
      .map(function (s) { return s.trim(); });

    var pending = names.length;
    var loaded = 0;

    function showEmpty() {
      if (empty) {
        gallery.style.display = "none";
        empty.hidden = false;
      }
    }
    function settle() {
      pending -= 1;
      if (pending <= 0 && loaded === 0) showEmpty();
    }

    if (names.length === 0) {
      showEmpty();
    } else {
      // Create each figure up front (in order) so the grid keeps the listed
      // order regardless of which image loads first. Listeners are attached
      // BEFORE src is set, so a missing file can never slip through.
      names.forEach(function (name, i) {
        var fig = document.createElement("figure");
        var img = document.createElement("img");
        img.alt = alts[i] || "OJ the cat";
        fig.style.display = "none";
        fig.appendChild(img);
        gallery.appendChild(fig);

        img.addEventListener("load", function () {
          fig.style.display = "";
          loaded += 1;
          settle();
        });
        img.addEventListener("error", function () {
          fig.remove();
          settle();
        });
        img.src = base + name;
      });
    }

    /* lightbox (built lazily on first click) */
    var lightbox;
    function buildLightbox() {
      lightbox = document.createElement("div");
      lightbox.className = "lightbox";
      lightbox.innerHTML =
        '<button class="lightbox__close" aria-label="Close">&times;</button><img alt="">';
      document.body.appendChild(lightbox);
      lightbox.addEventListener("click", closeLightbox);
      return lightbox;
    }
    function openLightbox(src, alt) {
      if (!lightbox) buildLightbox();
      var big = lightbox.querySelector("img");
      big.src = src;
      big.alt = alt || "";
      lightbox.classList.add("open");
    }
    function closeLightbox() {
      if (lightbox) lightbox.classList.remove("open");
    }
    gallery.addEventListener("click", function (e) {
      var img = e.target.closest("img");
      if (img) openLightbox(img.src, img.alt);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeLightbox();
    });
  }
})();
