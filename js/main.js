// Recipe Secrets Restaurant — shared behaviour for all pages
(function () {
  "use strict";

  /* Mobile nav toggle */
  function initNav() {
    var toggle = document.querySelector(".nav-toggle");
    var list = document.querySelector(".nav-list");
    if (!toggle || !list) return;
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      list.classList.toggle("is-open", !open);
    });
    list.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        toggle.setAttribute("aria-expanded", "false");
        list.classList.remove("is-open");
      });
    });
  }

  /* Highlight current page in nav */
  function markActiveNav() {
    var path = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-list a").forEach(function (link) {
      var href = link.getAttribute("href");
      if (href === path) {
        link.setAttribute("aria-current", "page");
      }
    });
  }

  /* Fade-in on scroll */
  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    items.forEach(function (el) { observer.observe(el); });
  }

  /* Specials page: category tabs */
  function initSpecialsTabs() {
    var tabs = document.querySelectorAll(".tab-btn");
    if (!tabs.length) return;
    var panels = document.querySelectorAll(".specials-panel");
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        tabs.forEach(function (t) { t.setAttribute("aria-selected", "false"); });
        panels.forEach(function (p) {
          p.classList.remove("is-active");
          p.setAttribute("hidden", "");
        });
        tab.setAttribute("aria-selected", "true");
        var panel = document.getElementById(tab.getAttribute("aria-controls"));
        if (panel) {
          panel.classList.add("is-active");
          panel.removeAttribute("hidden");
        }
      });
    });
  }

  /* Shared form helpers */
  function showFieldError(field, message) {
    field.classList.add("has-error");
    var msg = field.querySelector(".field-error");
    if (msg) msg.textContent = message;
  }
  function clearFieldError(field) {
    field.classList.remove("has-error");
  }
  function setFormMessage(container, type, text) {
    container.textContent = text;
    container.classList.remove("is-success", "is-error");
    container.classList.add(type === "success" ? "is-success" : "is-error");
  }

  /* Reservation form validation: no past dates, guests 1-20 */
  function initReservationForm() {
    var form = document.getElementById("reservation-form");
    if (!form) return;
    var msg = document.getElementById("reservation-msg");
    var dateField = form.querySelector("#res-date");
    if (dateField) {
      var today = new Date().toISOString().split("T")[0];
      dateField.setAttribute("min", today);
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var valid = true;

      [
        "res-name",
        "res-phone",
        "res-email",
        "res-date",
        "res-time",
        "res-guests",
      ].forEach(function (id) {
        var input = form.querySelector("#" + id);
        var field = input ? input.closest(".field") : null;
        if (field) clearFieldError(field);
      });

      var name = form.querySelector("#res-name");
      if (!name.value.trim()) {
        showFieldError(name.closest(".field"), "Please tell us your name.");
        valid = false;
      }

      var phone = form.querySelector("#res-phone");
      if (!phone.value.trim()) {
        showFieldError(phone.closest(".field"), "A phone number helps us confirm your table.");
        valid = false;
      }

      var email = form.querySelector("#res-email");
      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email.value.trim())) {
        showFieldError(email.closest(".field"), "Enter a valid email address.");
        valid = false;
      }

      var dateInput = form.querySelector("#res-date");
      if (!dateInput.value) {
        showFieldError(dateInput.closest(".field"), "Choose a reservation date.");
        valid = false;
      } else {
        var chosen = new Date(dateInput.value + "T00:00:00");
        var now = new Date();
        now.setHours(0, 0, 0, 0);
        if (chosen < now) {
          showFieldError(dateInput.closest(".field"), "Please choose today or a future date.");
          valid = false;
        }
      }

      var timeInput = form.querySelector("#res-time");
      if (!timeInput.value) {
        showFieldError(timeInput.closest(".field"), "Choose a time for your table.");
        valid = false;
      }

      var guests = form.querySelector("#res-guests");
      var guestCount = Number(guests.value);
      if (!guests.value || guestCount < 1 || guestCount > 20 || !Number.isInteger(guestCount)) {
        showFieldError(guests.closest(".field"), "Parties range from 1 to 20 guests.");
        valid = false;
      }

      if (!valid) {
        setFormMessage(msg, "error", "Please fix the highlighted fields and try again.");
        return;
      }

      submitForm(form, msg, "Thank you — your table request has been sent. We'll confirm by phone or email shortly.");
    });
  }

  /* Contact form validation */
  function initContactForm() {
    var form = document.getElementById("contact-form");
    if (!form) return;
    var msg = document.getElementById("contact-msg");

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var valid = true;

      ["contact-name", "contact-email", "contact-message"].forEach(function (id) {
        var input = form.querySelector("#" + id);
        var field = input ? input.closest(".field") : null;
        if (field) clearFieldError(field);
      });

      var name = form.querySelector("#contact-name");
      if (!name.value.trim()) {
        showFieldError(name.closest(".field"), "Please enter your name.");
        valid = false;
      }

      var email = form.querySelector("#contact-email");
      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email.value.trim())) {
        showFieldError(email.closest(".field"), "Enter a valid email address.");
        valid = false;
      }

      var message = form.querySelector("#contact-message");
      if (!message.value.trim()) {
        showFieldError(message.closest(".field"), "Let us know how we can help.");
        valid = false;
      }

      if (!valid) {
        setFormMessage(msg, "error", "Please fix the highlighted fields and try again.");
        return;
      }

      submitForm(form, msg, "Thank you for reaching out — we'll reply within one business day.");
    });
  }

  /* Submit to Formspree via fetch so we can show an inline message instead of redirecting */
  function submitForm(form, msg, successText) {
    var data = new FormData(form);
    fetch(form.action, {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    })
      .then(function (response) {
        if (response.ok) {
          setFormMessage(msg, "success", successText);
          form.reset();
        } else {
          setFormMessage(msg, "error", "Something went wrong sending your message. Please try again or call us directly.");
        }
      })
      .catch(function () {
        setFormMessage(msg, "error", "Something went wrong sending your message. Please try again or call us directly.");
      });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initNav();
    markActiveNav();
    initReveal();
    initSpecialsTabs();
    initReservationForm();
    initContactForm();
  });
})();
