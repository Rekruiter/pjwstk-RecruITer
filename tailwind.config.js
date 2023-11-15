/*eslint-env node*/
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/constants/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        dark: '#495867',
        dark_blue: '#577399',
        light_blue: '#BDD5EA',
        light: '#F7F7FF',
        orange: '#FE5F55',
        orange_dark: '#c74a42',
        error_color: '#FE5F55',
      },
      spacing: {
        0.25: '0.0625rem',
        22.5: '5.625rem',
        7.5: '1.875rem',
      },
      minWidth: {
        mobile: '320px',
        loginButton: '8rem',
        2: '2rem',
        3: '3rem',
        4.25: '4.25rem',
        7.5: '7.5rem',
      },
      minHeight: {
        6: '6rem',
      },
      maxWidth: {
        2: '2rem',
        5: '5rem',
      },
      fontSize: {
        title_bold: [
          '2rem',
          {
            fontWeight: '800',
          },
        ],
      },
    },
  },
  plugins: [],
};
