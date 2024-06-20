/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  darkMode: "class",
  content: ["./**/*.tsx"],
  plugins: [],
  theme: {
    fontSize: {
      xs: ["10px", "14px"],
      sm: ["14px", "20px"],
      md: ["16px", "24px"],
      base: ["16px", "24px"],
      lg: ["20px", "28px"],
      xl: ["24px", "32px"]
    },
    extend: {
      colors: {
        "brand-green": "#008080",
        "brand-light-green": "#CFF1DD",
        "brand-red": "#D34C3E",
        "brand-light-red": "#FFCCC7",
        "brand-orange": "#E78A00",
        "brand-light-orange": "#FFE2B7",
        "brand-yellow": "#D0B300",
        "brand-light-yellow": "#FDF6CB",
        "brand-grass-green": "#839E63",
        "brand-light-grass-green": "#EEFCDE"
      }
    }
  }
}
