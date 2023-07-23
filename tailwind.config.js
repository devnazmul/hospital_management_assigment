/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default
  {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
      "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
      "./node_modules/flowbite/**/*.js"
    ],
    theme: {
      extend: {
        colors: {

        }
      },
    },
    daisyui: {
      themes: [
        "light",
        "dark",
        {
          customLight: {
            "primary": "#2784ff",
            "secondary": "#ff5500",
            "offwhite":"#f6f7fc",
            "accent": "#10b981",
            "neutral": "#374151",
            "base-100": "#ffffff",
            "blue": "#0575b4",
            "info": "#38bdf8",
            "success": "#34d399",
            "warning": "#fde047",
            "error": "#ef4444",
          },
        },
        {
          customDark: {
            "primary": "#0575b4",
            "secondary": "#db2780",
            "offwhite":"#f6f7fc",
            "accent": "#10b981",
            "neutral": "#374151",
            "base-100": "#000000",
            "info": "#38bdf8",
            "success": "#34d399",
            "warning": "#fde047",
            "error": "#ef4444",
          },
        }

      ],
    },
    plugins: [daisyui],
  }
