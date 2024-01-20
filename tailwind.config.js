/*eslint-env node*/
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/constants/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/react-tailwindcss-datepicker/dist/index.esm.js',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        dark: '#495867',
        dark_blue: '#50698c',
        light_blue: '#BDD5EA',
        light: '#F7F7FF',
        orange: '#FE5F55',
        orange_dark: '#c74a42',
        error_color: '#FE5F55',
        success_color: '#4BB543',
      },
      spacing: {
        0.25: '0.0625rem',
        22.5: '5.625rem',
        7.5: '1.875rem',
      },
      minWidth: {
        mobile: '320px',
        authButton: '8rem',
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
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [import('tailwindcss-animate')],
};
