;(function () {
  'use strict'

  var hideNavButton = document.getElementById('hide-nav')

  hideNavButton.addEventListener('click', function () {
    var nav = document.getElementsByClassName('nav-container')[0]

    if (nav.style.display === 'none') {
      nav.style.display = 'block'
      hideNavButton.style.transform = 'none'
    } else {
      nav.style.display = 'none'
      hideNavButton.style.transform = 'rotate(180deg)'
    }
  })
})()
