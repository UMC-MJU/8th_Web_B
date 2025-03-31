/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // 👈 타입스크립트 + 리액트 환경이라 이렇게
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
