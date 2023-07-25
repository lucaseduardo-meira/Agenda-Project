module.exports = {
  purge: ["./front_end_src/**/*.{js,jsx,ts,tsx}", "./public/views/index.ejs"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
