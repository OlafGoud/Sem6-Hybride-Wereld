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
