import matchMediaPolyfill from "match-media-mock";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: matchMediaPolyfill.createMatchMedia,
});
