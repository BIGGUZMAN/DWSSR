/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts}", "./server/views/**/*.hbs"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
