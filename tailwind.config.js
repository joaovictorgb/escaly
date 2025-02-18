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
        blue: {
          600: '#4263EB', // Cor principal do botão
        },
      },
      borderRadius: {
        'full': '9999px',
      },
      screens: {
        'xs': '375px',     // Pequenos smartphones
        'sm': '640px',     // Smartphones maiores
        'md': '768px',     // Tablets
        'lg': '1024px',    // Desktop pequeno
        'xl': '1280px',    // Desktop médio
        '2xl': '1536px',   // Desktop grande
      },
    },
  },
  plugins: [],
} 