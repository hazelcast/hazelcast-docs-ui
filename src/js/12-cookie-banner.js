;(function () {
  'use strict'

  var cookieBanner = document.getElementById('cookie')
  var cookieButton = document.getElementById('cookie-close')
  var latestBanner = document.getElementById('latest-banner')

  if (window.localStorage.getItem('docsCookie') !== 'closed') {
    cookieBanner.style.display = 'flex'
  }

  const itemStr = window.localStorage.getItem('latestBannerCookie')
  if (itemStr) {
    const item = JSON.parse(itemStr)
    const now = new Date()
    if (now.getTime() > item.expiry) {
      window.localStorage.removeItem('latestBannerCookie')
      latestBanner.style.display = 'flex'
    }
  } else {
    latestBanner.style.display = 'flex'
  }

  cookieButton.addEventListener('click', function () {
    cookieBanner.style.display = 'none'
    window.localStorage.setItem('docsCookie', 'closed')
  })
})()
