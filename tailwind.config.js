module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite-react/**/*.js",
  ],
  theme: {
    extend: {
      zIndex: {
        '100': '100',
      }
    }
  },
  plugins: [require("flowbite/plugin")],
};
