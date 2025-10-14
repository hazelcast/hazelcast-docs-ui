;(function () {
  'use strict'

  const lightThemeOnBtn = document.getElementById('lightModeOnBtn')
  const darkThemeOnBtn = document.getElementById('darkModeOnBtn')

  const isDarkModePreferredBySystem = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches

  const colorScheme = document.querySelector('meta[name=color-scheme]')

  colorScheme.content = isDarkModePreferredBySystem ? 'dark' : 'light'

  if (lightThemeOnBtn && darkThemeOnBtn && colorScheme) {
    lightThemeOnBtn.addEventListener('click', () => {
      colorScheme.content = 'light'
    })

    darkThemeOnBtn.addEventListener('click', () => {
      colorScheme.content = 'dark'
    })
  }
})()
