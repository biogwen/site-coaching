(function () {
  // Year in footer
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Mobile nav toggle (better mobile behavior)
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("nav-menu");

  function closeMenu(){
    if (!menu || !toggle) return;
    menu.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var isOpen = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close when clicking a link
    menu.addEventListener("click", function (e) {
      var target = e.target;
      if (target && target.tagName === "A") closeMenu();
    });

    // Close when clicking outside
    document.addEventListener("click", function (e) {
      var t = e.target;
      if (!menu.classList.contains("open")) return;
      if (t === toggle || toggle.contains(t) || menu.contains(t)) return;
      closeMenu();
    });

    // Close on Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
  }

  // FAQ accordion
  var accordions = document.querySelectorAll("[data-accordion]");
  accordions.forEach(function (root) {
    var buttons = root.querySelectorAll(".faq-q");
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var expanded = btn.getAttribute("aria-expanded") === "true";
        // Collapse all siblings for simplicity
        buttons.forEach(function (b) {
          b.setAttribute("aria-expanded", "false");
          var panel = b.nextElementSibling;
          if (panel) panel.hidden = true;
        });
        // Expand current if it was not expanded
        if (!expanded) {
          btn.setAttribute("aria-expanded", "true");
          var panel = btn.nextElementSibling;
          if (panel) panel.hidden = false;
        }
      });
    });
  });

  // Basic contact form validation (placeholder)
  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var status = document.getElementById("form-status");

      var name = form.elements.namedItem("name");
      var email = form.elements.namedItem("email");
      var interest = form.elements.namedItem("interest");
      var message = form.elements.namedItem("message");

      var missing = [];
      if (!name || !name.value.trim()) missing.push("name");
      if (!email || !email.value.trim()) missing.push("email");
      if (!interest || !interest.value.trim()) missing.push("interest");
      if (!message || !message.value.trim()) missing.push("message");

      if (missing.length) {
        if (status) status.textContent = "Please complete: " + missing.join(", ") + ".";
        return;
      }

      // Placeholder behavior
      if (status) status.textContent = "Message ready to send. Connect this form to your backend or form provider.";
      form.reset();
    });
  }
})();
