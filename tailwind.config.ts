import type { Config } from 'tailwindcss';

const mainColor = '#FFC33D';
const secondaryColor = '#0E0A04';
const mainFont = 'Bebas Neue';
const secondaryFont = 'Bangers';
const logoFont = 'Good Timing';
const textFont = 'Roboto Condensed';

const config: Config = {
  content: [
    './src/*.{js,ts,jsx,tsx,mdx}',
    './src/components/*.{js,ts,jsx,tsx,mdx}',
    './src/tabs/**/*.{js,ts,jsx,tsx,mdx}',
    './src/tabs/*.{js,ts,jsx,tsx,mdx}',
    './src/tabs/adm/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'infinite-scroll': 'infinite-scroll 25s linear infinite',
      },

      backgroundColor: {
        primary: mainColor,
        secondary: secondaryColor,
        hq: '#F5F5DC',
      },
      fontFamily: {
        primary: logoFont,
        secondary: secondaryFont,
        terciary: mainFont,
        text: textFont,
      },
      colors: {
        primary: mainColor,
        secondary: secondaryColor,
      },
      borderColor: {
        primary: mainColor,
      },
      height: {
        max: '34rem',
        line: '1px',
      },
      maxHeight: {
        table: '44rem',
      },
    },
    keyframes: {
      'infinite-scroll': {
        from: {
          transform: 'translateX(0)',
        },
        to: {
          transform: 'translateX(-100%)',
        },
      },
    },
  },

  plugins: [],
};
export default config;
