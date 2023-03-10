/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}',
    "./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}"
  ],
  theme: {
    extend: {
      colors: {
        primary: { "50": "#eff6ff", "100": "#dbeafe", "200": "#bfdbfe", "300": "#93c5fd", "400": "#60a5fa", "500": "#3b82f6", "600": "#2563eb", "700": "#1d4ed8", "800": "#1e40af", "900": "#1e3a8a" },
      },
      maxHeight: { "99": "32rem", "108": "36rem", "105": "35rem", "100": "32rem" },
      minHeight: { "108": "36rem", "112": "44rem", "100": "32rem" },
    minHeight: { "108": "36rem", "112": "44rem", "100": "32rem" }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
  darkMode: "class"
}
