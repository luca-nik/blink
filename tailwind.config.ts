import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#000000", // Ensure black is explicitly defined (though it's default in Tailwind)
        yellow: {
          100: "#fef5b7", // Light yellow (for hover effect)
          200: "#fce166", // Lighter yellow for certain UI elements
          300: "#fbbf24", // Default yellow for text and UI elements
          400: "#eab308", // More intense yellow for primary elements like titles
          500: "#ca8a04", // Deep yellow, maybe for accents
        },
      },
      backgroundImage: {
        'hive-pattern': "url('/hive.png')", // Add your background image reference here
      },
      fontFamily: {
        sans: ['Inter', 'Arial', 'sans-serif'], // Ensure a good sans-serif font is available
      },
    },
  },
  plugins: [require("daisyui")],
};

export default config;
