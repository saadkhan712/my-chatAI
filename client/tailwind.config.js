import plugin from "tailwindcss/plugin";
import tailwindScrollbarHide from "tailwind-scrollbar-hide";

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    tailwindScrollbarHide, // Import properly
    plugin(({ addUtilities }) => {
      addUtilities({
        ".hide-scrollbar": {
          "scrollbar-width": "none",
          "-ms-overflow-style": "none",
        },
        ".hide-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
      });
    }),
  ],
};
