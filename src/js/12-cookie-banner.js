;(function () {
  'use strict'

  var cookieBanner = document.getElementById('cookie')
  var cookieButton = document.getElementById('cookie-close')

  if (window.localStorage.getItem('docsCookie') !== 'closed') {
    cookieBanner.style.display = 'flex'
  };
  cookieButton.addEventListener('click', function () {
    cookieBanner.style.display = 'none'
    window.localStorage.setItem('docsCookie', 'closed')
  })
})()
