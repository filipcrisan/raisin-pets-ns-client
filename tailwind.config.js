/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/app/**/*.{css,xml,html,vue,svelte,ts,tsx}"],
  // use the .ns-dark class to control dark mode (applied by NativeScript) - since 'media' (default) is not supported.
  darkMode: ["class", ".ns-dark"],
  theme: {
    extend: {
      colors: {
        "landing-page-yellow": "#eee4e5",
      },
    },
    fontFamily: {
      sans: ["-apple-system", "BlinkMacSystemFont"],
      serif: ["Georgia", "Cambria"],
      mono: ["monospace"],
    },
  },
  corePlugins: {
    preflight: false, // disables browser-specific resets
  },
};
