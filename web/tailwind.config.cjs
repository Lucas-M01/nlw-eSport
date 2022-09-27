/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/**/*.tsx',
    './index.html',
  ],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif']
    },
    extend: {
      backgroundImage: {
        galaxy: "url('/fundo-nlw-esport.png')",
        'nlw-gradient': 'linear-gradient(90deg, rgba(149,114,252,1) 0%, rgba(67,231,173,1) 57%, rgba(225,213,93,1) 90%)',
        'game-gradient': 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 67.08%)'
      },
      keyframes: {
        slide :{
          '0%'  : { marginLeft: '-800px'},
          '20%' : { marginLeft: '-800px'},
          '35%' : { marginLeft: '0px'},
        },
        appear : {
          '0%' :{
            opacity: '0'
          },
          '20%' :{
            opacity: '1'
          },
          '80%' :{
            opacity: '1'
          }
        },
        reveal : {
          '0%' :{
            opacity: '0',
            width: '0px',
          },
          '20%' :{
            opacity: '1',
            width: '0px'
          },
          '30%' :{
            width: '800px'
          },
          '80%' :{
            opacity: '1'
          },
        }
      },
      animation : {
        slide: 'slide 6s',
        reveal: 'reveal 6s',
        appear: 'appear 6s'
      },
    },
    plugins: [],
  }
}