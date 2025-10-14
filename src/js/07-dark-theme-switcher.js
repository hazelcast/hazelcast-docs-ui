;(function () {
  'use strict'

  const lightThemeOnBtn = document.getElementById('lightModeOnBtn')
  const darkThemeOnBtn = document.getElementById('darkModeOnBtn')
  const colorScheme = document.querySelector('meta[name=color-scheme]')

  if (lightThemeOnBtn && darkThemeOnBtn && colorScheme) {
    lightThemeOnBtn.addEventListener('click', () => {
      colorScheme.content = 'light'
    })

    darkThemeOnBtn.addEventListener('click', () => {
      colorScheme.content = 'dark'
    })
  }
})()
