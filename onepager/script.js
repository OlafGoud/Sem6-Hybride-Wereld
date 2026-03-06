const blocks = document.querySelectorAll(".reveal");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reducedMotion || !("IntersectionObserver" in window)) {
  blocks.forEach((el) => {
    el.classList.remove("opacity-0", "translate-y-3");
    el.classList.add("opacity-100", "translate-y-0");
  });
} else {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.remove("opacity-0", "translate-y-3");
        entry.target.classList.add("opacity-100", "translate-y-0");
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
  );

  blocks.forEach((block, index) => {
    block.style.transitionDelay = `${(index % 4) * 70}ms`;
    observer.observe(block);
  });
}

const desiredTriggers = document.querySelectorAll("[data-desired-trigger]");
const desiredTitle = document.querySelector("[data-desired-title]");
const desiredText = document.querySelector("[data-desired-text]");
const desiredImage = document.querySelector("[data-desired-image]");
const desiredContentNodes = document.querySelectorAll("[data-desired-content]");

if (
  desiredTriggers.length &&
  desiredTitle &&
  desiredText &&
  desiredImage &&
  desiredContentNodes.length
) {
  const desiredContent = new Map();

  desiredContentNodes.forEach((node) => {
    desiredContent.set(node.dataset.key, {
      title: node.dataset.title || "",
      text: node.textContent.trim(),
      image: node.dataset.image || "",
      alt: node.dataset.alt || ""
    });
  });

  const setActiveTrigger = (activeKey) => {
    desiredTriggers.forEach((trigger) => {
      const isActive = trigger.dataset.desiredTrigger === activeKey;
      trigger.classList.toggle("bg-ui-primary", isActive);
      trigger.classList.toggle("border-ui-primary", isActive);
      trigger.classList.toggle("text-white", isActive);
      trigger.classList.toggle("bg-white", !isActive);
      trigger.classList.toggle("border-slate-200", !isActive);
      trigger.classList.toggle("text-slate-700", !isActive);
      trigger.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
  };

  const renderDesiredState = (key) => {
    const entry = desiredContent.get(key);
    if (!entry) return;

    desiredTitle.textContent = entry.title;
    desiredText.textContent = entry.text;
    desiredImage.src = entry.image;
    desiredImage.alt = entry.alt;
    setActiveTrigger(key);
  };

  desiredTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      renderDesiredState(trigger.dataset.desiredTrigger);
    });
  });

  renderDesiredState(desiredTriggers[0].dataset.desiredTrigger);
}

const flipCards = document.querySelectorAll("[data-flip-card]");

flipCards.forEach((card) => {
  card.setAttribute("aria-pressed", "false");
  card.addEventListener("click", () => {
    const isFlipped = card.classList.toggle("is-flipped");
    card.setAttribute("aria-pressed", isFlipped ? "true" : "false");
  });
});
