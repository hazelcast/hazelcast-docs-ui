;(function () {
  'use strict'

  const LOCAL_STORAGE_KEY = 'HZ_DOCS:COLOR_MODE'

  const getPersistedOrSystemColorMode = () => {
    let persistedColorMode = window.localStorage.getItem(LOCAL_STORAGE_KEY)

    if (persistedColorMode !== 'dark' && persistedColorMode !== 'light') {
      const isDarkModePreferredBySystem = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      persistedColorMode = isDarkModePreferredBySystem ? 'dark' : 'light'
    }

    return persistedColorMode
  }

  const lightThemeOnBtn = document.getElementById('lightModeOnBtn')
  const darkThemeOnBtn = document.getElementById('darkModeOnBtn')

  const persistedColorMode = getPersistedOrSystemColorMode()

  const colorScheme = document.querySelector('meta[name=color-scheme]')

  colorScheme.content = persistedColorMode

  if (lightThemeOnBtn && darkThemeOnBtn && colorScheme) {
    lightThemeOnBtn.addEventListener('click', () => {
      colorScheme.content = 'light'
      window.localStorage.setItem(LOCAL_STORAGE_KEY, 'light')
    })

    darkThemeOnBtn.addEventListener('click', () => {
      colorScheme.content = 'dark'
      window.localStorage.setItem(LOCAL_STORAGE_KEY, 'dark')
    })
  }
})()
