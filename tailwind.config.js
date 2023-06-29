/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          600: '#7F56D9',
          500: '#7A5AF8',
          50: '#F9F5FF'
        },
        'gray': {
          500: '#667085',
          400: '#A0A0AB',
          300: '#D0D5DD',
          200: '#EAECF0',
          100: '#F4F4F5',
          50: '#F2F4F7'
        },
        'warning': {
          600: '#DC6803',
          300: '#FEC84B',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
