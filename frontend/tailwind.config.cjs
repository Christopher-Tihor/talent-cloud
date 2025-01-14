/** @type {import('tailwindcss').Config} */
const withMT = require('@material-tailwind/react/utils/withMT');
const { colors } = require('tailwindcss/defaultTheme');
module.exports = withMT({
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx,css}'],

  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1150px',
      xl: '1440px',
      '2xl': '2500px',
    },
    // overridden here as mui tailwind uses these color values for some of the psuedo classes
    colors: {
      ...colors,
      blue: {
        ...colors.blue,
        600: '#4e7192',
      },
      gray: {
        ...colors.gray,
        900: '#1A5A96',
      },
    },
    extend: {
      gridTemplateColumns: {
        32: 'repeat(32, minmax(0, 1fr))',
      },
      fontFamily: {
        sans: ['"BC Sans"'],
      },
      colors: {
        // TODO will uncomment once I've updated the colors in the rest of the app
        // dark: {
        //   100: '#FFFFFF',
        //   300: '#F2F2F2',
        //   400: '#CFCFCF',
        //   500: '#878787',
        //   600: '#606060',
        //   710: '#313132',
        //   700: '#262729',
        //   800: '#000000',
        // },
        blue: {
          // Deployed calendar block
          200: '#ECF5FB',
          // Info banner background
          300: '#D9EAF7',
          400: '#BEDAF4',
          700: '#3B8FDD',
          // Info text, background
          800: '#1A5A96',
          900: '#003366'
        },
        ink: {
          300: '#007FFF',
          700: '#004D99',
          // BC gov primary
          900: '#003366',
        },
        skyline: {
          // hover deployed calendar
          100: '#E1EEF9',
          // Hyperlinks, links with underscore
          200: '#3B99FC',
        },
        stormy: {
          100: '#EFF2F6',
          200: '#DFE4EC',
          300: '#BFC9D9',
          // Disabled blue
          500: '#7E93B3',
          // Background
          700: '#38598A',
        },
        dark: {
          100: '#FFFFFF',
          200: '#FAFAFA',
          300: '#F2F2F2',
          400: '#CFCFCF',
          500: '#878787',
          600: '#606060',
          700: '#313132',
          800: '#262729',
          900: '#000000',
        },
        forest: {
          500: '#81917A',
          700: '#576D4D',
          //Success banner text
          900: '#2D4821',
        },
        leaf: {
          // success
          700: '#2E8540',
        },
        sprout: {
          // Available calendar block
          100: '#EFF7EB',
          // Hovered available cal block
          200: '#E5F3E0',
          // Success banner background
          300: '#DFF0D8',
          400: '#C8E1BD',
          700: '#70B054',
        },
        red: {
          // Unavailable calendar block
          100: '#F5E5E5',
          // Error banner background
          200: '#F2DEDE',
          300: '#D9A8A7',
          // Error Banner Text
          600: '#A12622',
        },
        cherry: {
          //Unavailable calendar block
          200: '#F9EFEF',
          // Error text (form fields)
          700: '#D8292F',
        },
        yellow: {
          //Warning banner background
          200: '#F9F1C6',
          //BC Gov Primary Yellow
          300: '#FCBA19',
          400: '#D18F00',
          // Warning banner text
          900: '#6C4A00',
        },
        purple: {
          100: '#EFE8F4',
          // Status tag background
          200: '#E8D9F7',
          300: '#CFBADF',

          500: '#8F5FB5',
          // Status tag border and text
          600: '#5F1A96',
        },

        errorRed: '#D8292F',

        transparent: 'transparent',
        primaryBlue: '#38598A',
        primaryYellow: '#fcba19',
        activeGreen: '#d6ebd0',
        inputGray: '#606060',
        disabledGray: '#CFCFCF',
        linkBlue: '#1a5a96',
        // semantic colours
        error: '#A12622',
        success: '#2e8540',
        warning: '#EED202',
        info: '#1a5a96',
        focus: '#3B99FC',
        active: '#2D4821',
        inactive: '#343633',
        warningDark: '#6C4A00',
        successDark: '#2D4821',
        infoDark: '#1A5A96',
        white: '#FFFFFF',
        calGreen: '#eef7eb',
        calGreenTwo: '#84967d',
        calGreenHover: '#dff0d9',
        calGreenText: '#2D4821',
        calRed: '#f9eeef',
        calRedTwo: '#a6312c',
        calRedHover: '#f2dbdd',
        calBlue: '#ecf5fa',
        calBlueTwo: '#1a5b97',
        calBlueHover: '#d8eaf5',
        darkPurple: '#6f2fa2',
        lightPurple: '#E8D9F7',
        darkYellow: '#826521',
        lightYellow: '#F9F1C6',
      },
      backgroundColor: {
        primaryBackgroundBlue: '#38598A',
        backgroundBlue: '#003366',
        grayBackground: '#F6F9FC',
        transparent: 'transparent',
        active: '#EFF7EB',
        inactive: '#F4F4F4',
        defaultGray: '#f2f2f2',

        white: '#FFFFFF',
        errorBannerDark: '#A12622',
        errorBannerLight: '#F2DEDE',
        successBannerDark: '#2D4821',
        successBannerLight: '#E5F3E0',
        warningBannerDark: '#6C4A00',
        warningBannerLight: '#FDFAE6',
        infoBannerDark: '#1A5A96',
        infoBannerLight: '#ECF5FB',
      },
      textColor: {
        defaultGray: '#606060',
        backgroundBlue: '#003366',
        blue700: '#004D99',
        info: '#1a5a96',
        active: '#2D4821',
        inactive: '#343633',

        darkGrey: '#313132',
        light: '#FFFFFF',
        black: '#000000',
        ministry: '#1A5A96',
        error: '#A12622',
        warning: '#6C4A00',

        icon: '#606060',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
});
