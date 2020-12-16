;(function () {
  'use strict'
  var versions = document.getElementsByClassName('version hidden')
  var seeMoreButton = document.getElementById('more-versions')
  var seeLessButton = document.getElementById('fewer-versions')

  if (seeMoreButton !== null && versions !== null) {
    seeMoreButton.addEventListener('click', function (e) {
      seeMoreButton.style.display = 'none'
      seeLessButton.style.display = 'block'
      for (var i = 0; i < versions.length; i++) {
        versions[i].style.display = 'block'
        console.log(versions[i])
      }
      console.log('hello')
    })
    seeLessButton.addEventListener('click', function (e) {
      seeMoreButton.style.display = 'block'
      seeLessButton.style.display = 'none'
      for (var i = 0; i < versions.length; i++) {
        versions[i].style.display = 'none'
      }
    })
  }
})()
