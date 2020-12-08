;(function () {
  'use strict'
  var open = document.getElementById('search-open')
  var close = document.getElementById('search-close')
  var searchBox = document.getElementById('search-input')

  if (open !== null && close !== null) {
    open.addEventListener('click', function (e) {
      // NOTE: ignore event on pseudo-element
      if (e.currentTarget === e.target) return
      open.style.display = 'none'
      close.style.display = 'block'
      searchBox.style.display = 'block'
    })
    close.addEventListener('click', function (e) {
      // NOTE: ignore event on pseudo-element
      if (e.currentTarget === e.target) return
      open.style.display = 'block'
      close.style.display = 'none'
      searchBox.style.display = 'none'
    })
  }
})()
