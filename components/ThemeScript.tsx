// Runs before hydration and before first paint, so the correct theme class
// is already on <html> by the time anything renders — this is what
// prevents a flash of the wrong theme on load/refresh. Must be a genuinely
// synchronous, parser-blocking inline <script> (not a useEffect, and
// measured NOT to be next/script's `beforeInteractive` either — that goes
// through Next.js's script-loading machinery and still let a light-theme
// frame paint before it ran, confirmed by frame-by-frame instrumentation
// during development). A raw <script> with no src blocks HTML parsing
// (and therefore paint) until it finishes, which a JS-mediated loader
// cannot guarantee.
// Dark is the default theme: apply the `dark` class unless the visitor has
// explicitly chosen light (localStorage.theme === "light"). If storage is
// unavailable, still fall back to dark so the default is honored.
const THEME_SCRIPT = `(function(){try{if(localStorage.getItem("theme")!=="light"){document.documentElement.classList.add("dark")}}catch(e){document.documentElement.classList.add("dark")}})();`;

export default function ThemeScript() {
  // eslint-disable-next-line react/no-danger
  return <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />;
}
