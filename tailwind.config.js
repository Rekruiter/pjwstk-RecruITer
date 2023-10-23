/*eslint-env node*/
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/pages/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        dark: '#495867',
        dark_blue: '#577399',
        light_blue: '#BDD5EA',
        light: '#F7F7FF',
        orange: '#FE5F55',
      },
      spacing: {
        22.5: '5.625rem',
        7.5: '1.875rem',
      },
      minWidth: {
        mobile: '320px',
      },
    },
  },
  plugins: [],
};
