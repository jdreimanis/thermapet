(function () {
  var toggle = document.getElementById("nav-toggle");
  var links = document.getElementById("nav-links");
  if (!toggle || !links) return;

  function setOpen(open) {
    links.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  }

  toggle.addEventListener("click", function () {
    setOpen(!links.classList.contains("open"));
  });

  links.querySelectorAll("a").forEach(function (anchor) {
    anchor.addEventListener("click", function () {
      setOpen(false);
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") setOpen(false);
  });

  var anchors = Array.prototype.slice.call(links.querySelectorAll("a[href^='#']"));
  var sections = anchors
    .map(function (anchor) {
      return document.querySelector(anchor.getAttribute("href"));
    })
    .filter(Boolean);

  if (!("IntersectionObserver" in window)) return;

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        anchors.forEach(function (anchor) {
          var on = anchor.getAttribute("href") === "#" + entry.target.id;
          anchor.classList.toggle("active", on);
          if (on) anchor.setAttribute("aria-current", "true");
          else anchor.removeAttribute("aria-current");
        });
      });
    },
    { rootMargin: "-40% 0px -50% 0px" }
  );

  sections.forEach(function (section) {
    observer.observe(section);
  });
})();
