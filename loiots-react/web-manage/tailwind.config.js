module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  purge: ['./src/pages/CkEditor/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
  // corePlugins: {
  //   preflight: false
  // }
}