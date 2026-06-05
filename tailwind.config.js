/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#0076bd',
          'blue-dark': '#005b93',
          orange: '#ff8700',
          lime: '#d6df32'
        },
        ink: '#0b2d45',
        muted: '#6b7c89',
        line: '#d7e1e8',
        surface: '#f2f5f7',
        panel: '#ffffff'
      },
      fontFamily: {
        sans: ['Arial', 'Helvetica', 'sans-serif']
      },
      boxShadow: {
        shell: '0 0 0 1px rgba(11, 45, 69, 0.08), 0 18px 60px rgba(11, 45, 69, 0.2)',
        card: '0 2px 8px rgba(11, 45, 69, 0.14)'
      }
    }
  },
  plugins: []
}
