(function () {
  "use strict";

  // Mobile nav toggle
  var toggle = document.getElementById("nav-toggle");
  var mobileNav = document.getElementById("site-nav-mobile");
  if (toggle && mobileNav) {
    toggle.addEventListener("click", function () {
      var open = mobileNav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mobileNav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Scroll reveal
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el, i) {
      el.style.transitionDelay = Math.min(i * 60, 300) + "ms";
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  // Copy-to-clipboard for code blocks
  document.querySelectorAll(".post-content pre").forEach(function (block) {
    if (block.querySelector(".copy-btn")) return;
    var btn = document.createElement("button");
    btn.className = "copy-btn";
    btn.type = "button";
    btn.textContent = "Copy";
    btn.addEventListener("click", function () {
      var code = block.innerText.replace(/Copy$/, "").trim();
      navigator.clipboard.writeText(code).then(function () {
        btn.textContent = "Copied!";
        setTimeout(function () { btn.textContent = "Copy"; }, 1500);
      });
    });
    block.appendChild(btn);
  });

  // Reading progress bar
  var postContent = document.querySelector(".post-content");
  if (postContent) {
    var bar = document.createElement("div");
    bar.className = "reading-progress";
    document.body.appendChild(bar);
    window.addEventListener("scroll", function () {
      var rect = postContent.getBoundingClientRect();
      var total = postContent.offsetHeight - window.innerHeight;
      var scrolled = Math.min(Math.max(-rect.top, 0), total);
      var pct = total > 0 ? (scrolled / total) * 100 : 0;
      bar.style.width = pct + "%";
    }, { passive: true });
  }

  // Back-to-top
  var toTop = document.createElement("button");
  toTop.className = "to-top";
  toTop.type = "button";
  toTop.setAttribute("aria-label", "Back to top");
  toTop.innerHTML = "&uarr;";
  toTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  document.body.appendChild(toTop);
  window.addEventListener("scroll", function () {
    toTop.classList.toggle("visible", window.scrollY > 600);
  }, { passive: true });

  // Tag/series filter chips (blog listing page)
  var filterBar = document.querySelector(".filter-bar");
  if (filterBar) {
    var chips = filterBar.querySelectorAll(".filter-chip");
    var cards = document.querySelectorAll("[data-tags]");
    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        chips.forEach(function (c) { c.classList.remove("active"); });
        chip.classList.add("active");
        var tag = chip.getAttribute("data-filter");
        cards.forEach(function (card) {
          var tags = (card.getAttribute("data-tags") || "").split(",");
          card.style.display = (tag === "all" || tags.indexOf(tag) > -1) ? "" : "none";
        });
      });
    });
  }

  // Typing terminal ("cat about_me" animation on the About page)
  var typingTerminal = document.querySelector(".typing-terminal");
  if (typingTerminal) {
    var cmdEl = typingTerminal.querySelector(".typed-cmd");
    var caretEl = typingTerminal.querySelector(".typing-caret");
    var outputEl = typingTerminal.querySelector(".typing-output");
    var command = "cat about_me";
    var i = 0;
    var typeChar = function () {
      if (i <= command.length) {
        cmdEl.textContent = command.slice(0, i);
        i++;
        setTimeout(typeChar, 80);
      } else {
        setTimeout(function () {
          caretEl.classList.add("done");
          if (outputEl) outputEl.classList.add("show");
        }, 250);
      }
    };
    setTimeout(typeChar, 500);
  }

  // Newsletter form (static — no backend yet)
  var ctaForm = document.querySelector(".cta-form");
  if (ctaForm) {
    ctaForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var note = ctaForm.parentElement.querySelector(".cta-note");
      if (note) note.textContent = "Thanks — hook this form up to your ESP of choice (Buttondown, ConvertKit, etc).";
    });
  }
})();
