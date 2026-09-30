// The page works fully without this file. It adds quick exit, one-recording-at-a-time,
// the current section in the header, and a quiet fade-up as content comes into view.

// Quick exit: leave the site without adding it to the Back button's history.
const exitLink = document.getElementById("quick-exit");
if (exitLink) {
  exitLink.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.replace(exitLink.href);
  });
}

// Only one recording plays at a time.
const players = document.querySelectorAll("video, audio");
players.forEach((player) => {
  player.addEventListener("play", () => {
    players.forEach((other) => {
      if (other !== player) other.pause();
    });
  });
});

// Mark the section currently in view, so the header shows where you are.
const navLinks = [...document.querySelectorAll(".site-nav a")];
const navSections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if (navSections.length && "IntersectionObserver" in window) {
  const setCurrent = (id) => {
    navLinks.forEach((link) => {
      const on = link.getAttribute("href") === `#${id}`;
      if (on) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
  };

  const seen = new Map();
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => seen.set(entry.target.id, entry.isIntersecting));
      const current = navSections.find((section) => seen.get(section.id));
      if (current) setCurrent(current.id);
    },
    { rootMargin: "-30% 0px -55% 0px", threshold: 0 }
  );

  navSections.forEach((section) => observer.observe(section));
}

// Fade content up as it enters the screen. The header is left alone so Quick exit
// is visible immediately. With reduced motion, or without this script, nothing is hidden.
const motionOK = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (motionOK && "IntersectionObserver" in window) {
  const itemSelector = [
    ".hero-copy",
    ".notice",
    ".facts > li",
    ".event-when",
    ".event-body",
    ".pullquote",
    ".shots > li",
    ".shot-plain",
    ".recording",
    ".pattern > li",
    ".help-list > li",
    ".emergency",
    ".safety-tip",
    ".about-list > dt",
    ".about-list > dd",
  ].join(",");

  const pieces = [];
  document.querySelectorAll("main .block > .wrap, .site-footer .wrap").forEach((wrap) => {
    [...wrap.children].forEach((child) => {
      const nested = [...child.querySelectorAll(itemSelector)].filter(
        (el) => !el.parentElement.closest(itemSelector)
      );
      if (child.matches(itemSelector)) pieces.push(child);
      else if (nested.length) pieces.push(...nested);
      else pieces.push(child);
    });
  });

  const unique = [...new Set(pieces)];
  const riseObserver = new IntersectionObserver(
    (entries) => {
      const appearing = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => {
          const follows = a.target.compareDocumentPosition(b.target) & Node.DOCUMENT_POSITION_FOLLOWING;
          return follows ? -1 : 1;
        });
      appearing.forEach((entry, index) => {
        entry.target.style.setProperty("--rise-delay", `${Math.min(index, 4) * 70}ms`);
        entry.target.classList.add("is-in");
        riseObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -4% 0px" }
  );

  unique.forEach((el) => el.setAttribute("data-rise", ""));
  document.documentElement.classList.add("reveal");
  requestAnimationFrame(() => {
    unique.forEach((el) => riseObserver.observe(el));
  });
}
