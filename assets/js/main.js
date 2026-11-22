(() => {
  "use strict";
  const root = document.documentElement;
  const toggle = document.querySelector(".theme-toggle");
  function syncThemeButton() {
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    toggle.setAttribute("aria-label", `Switch to ${next} theme`);
    toggle.setAttribute("title", `Switch to ${next} theme`);
  }
  syncThemeButton();
  toggle.addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    try {
      localStorage.setItem("rid-theme", root.dataset.theme);
    } catch (_) {}
    // A query string selects an initial preview; remove it after a manual choice.
    const url = new URL(location.href);
    if (url.searchParams.has("theme")) {
      url.searchParams.delete("theme");
      history.replaceState(null, "", url.pathname + url.search + url.hash);
    }
    syncThemeButton();
  });
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  function closeMenu() {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
    nav.classList.remove("is-open");
  }
  menuToggle.addEventListener("click", () => {
    const open = menuToggle.getAttribute("aria-expanded") !== "true";
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    nav.classList.toggle("is-open", open);
  });
  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("is-open")) {
      closeMenu();
      menuToggle.focus();
    }
  });
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".site-header")) closeMenu();
  });
  matchMedia("(min-width: 681px)").addEventListener("change", (event) => {
    if (event.matches) closeMenu();
  });

  const samples = {
    invoice: {
      file: "supplier-invoice.pdf",
      source: "One document. A handful of useful details.",
      rows: [
        ["supplier", "Oak & Co."],
        ["invoice_number", "INV-2026-042"],
        ["total_eur", "1,240.00"],
        ["review_status", "Ready for review"],
      ],
    },
    catalogue: {
      file: "product-catalogue.pdf",
      source: "Product details, without the copy and paste.",
      rows: [
        ["product", "Studio desk lamp"],
        ["sku", "LMP-042"],
        ["price_eur", "89.00"],
        ["review_status", "Ready for review"],
      ],
    },
  };
  let currentSample = "invoice";
  let running = false;
  const tabs = [...document.querySelectorAll("[data-demo]")];
  const panel = document.querySelector("#demo-panel");
  const output = document.querySelector("#demo-output");
  const status = document.querySelector("#demo-status");
  const runButton = document.querySelector("#run-demo");
  function renderSample(key) {
    const data = samples[key];
    currentSample = key;
    document.querySelector("#demo-file").textContent = data.file;
    document.querySelector("#demo-source").textContent = data.source;
    output.replaceChildren(
      ...data.rows.map(([name, value]) => {
        const row = document.createElement("div");
        const dt = document.createElement("dt");
        const dd = document.createElement("dd");
        dt.textContent = name;
        if (name === "review_status") {
          const badge = document.createElement("span");
          badge.className = "review-badge";
          badge.textContent = value;
          dd.append(badge);
        } else {
          dd.textContent = value;
        }
        row.append(dt, dd);
        return row;
      }),
    );
    tabs.forEach((tab) => {
      const selected = tab.dataset.demo === key;
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });
    panel.setAttribute("aria-labelledby", `tab-${key}`);
    status.textContent = "Sample data. Real possibilities.";
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      if (!running) renderSample(tab.dataset.demo);
    });
    tab.addEventListener("keydown", (event) => {
      let target;
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") target = tabs[(index + 1) % tabs.length];
      if (event.key === "Home") target = tabs[0];
      if (event.key === "End") target = tabs[tabs.length - 1];
      if (target && !running) {
        event.preventDefault();
        target.focus();
        renderSample(target.dataset.demo);
      }
    });
  });
  runButton.addEventListener("click", () => {
    if (running) return;
    running = true;
    document.querySelector(".workflow-demo").classList.add("is-running");
    runButton.disabled = true;
    tabs.forEach((tab) => {
      tab.disabled = true;
    });
    panel.setAttribute("aria-busy", "true");
    status.textContent = "Demonstrating extraction…";
    setTimeout(
      () => {
        renderSample(currentSample);
        document.querySelector(".workflow-demo").classList.remove("is-running");
        runButton.disabled = false;
        tabs.forEach((tab) => {
          tab.disabled = false;
        });
        panel.removeAttribute("aria-busy");
        status.textContent = "Example complete. Ready for human review.";
        running = false;
      },
      matchMedia("(prefers-reduced-motion: reduce)").matches ? 100 : 1100,
    );
  });

  const exampleDialog = document.querySelector("#example-dialog");
  document.querySelectorAll(".example-open").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelector("#dialog-title").textContent = button.dataset.title;
      document.querySelector("#dialog-copy").textContent = button.dataset.detail;
      exampleDialog.showModal();
    });
  });
  document.querySelectorAll("dialog").forEach((dialog) => {
    dialog.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", (event) => {
      const box = dialog.getBoundingClientRect();
      if (
        event.target === dialog &&
        (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom)
      )
        dialog.close();
    });
    dialog
      .querySelectorAll("[data-close-dialog]")
      .forEach((link) => link.addEventListener("click", () => dialog.close()));
  });
  const prepareBrief = document.querySelector("#prepare-brief");
  if (prepareBrief) {
    prepareBrief.addEventListener("click", () => document.querySelector("#contact-dialog").showModal());
    document.querySelector("#copy-brief").addEventListener("click", async () => {
      const brief = document.querySelector("#brief");
      const message = document.querySelector("#brief-status");
      if (!brief.value.trim()) {
        message.textContent = "Add a few details first, then copy your brief.";
        brief.focus();
        return;
      }
      try {
        await navigator.clipboard.writeText(brief.value);
        message.textContent = "Copied. Nothing has been submitted.";
      } catch (_) {
        brief.select();
        message.textContent = "Select and copy this text using your device’s copy command.";
      }
    });
  }
})();
