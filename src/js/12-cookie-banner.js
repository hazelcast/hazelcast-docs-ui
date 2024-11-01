;(function () {
  'use strict'

  var cookieBanner = document.getElementById('cookie')
  var cookieButton = document.getElementById('closeCookies')
  var latestBanner = document.getElementById('latest-banner')

  if (window.localStorage.getItem('docsCookie') !== 'closed') {
    cookieBanner.style.display = 'flex'
  }

  const bannerCookie = window.localStorage.getItem('latestBannerCookie')
  if (bannerCookie && latestBanner) {
    const item = JSON.parse(bannerCookie)
    const now = new Date()
    if (now.getTime() > item.expiry) {
      window.localStorage.removeItem('latestBannerCookie')
      latestBanner.style.display = 'flex'
    }
  } else if (!bannerCookie && latestBanner) {
    latestBanner.style.display = 'flex'
  }

  cookieButton.addEventListener('click', function () {
    cookieBanner.style.display = 'none'
    window.localStorage.setItem('docsCookie', 'closed')
  })
})()
