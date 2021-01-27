;(function () {
  'use strict'
  var seeMoreButtons = document.getElementsByClassName('more-versions')
  var seeLessButtons = document.getElementsByClassName('fewer-versions')

  if (seeMoreButtons !== null) {
    for (var i = 0; i < seeMoreButtons.length; i++) {
      seeMoreButtons[i].addEventListener('click', function (e) {
        var seeLessButton = this.nextElementSibling
        this.style.display = 'none'
        seeLessButton.style.display = 'block'
        var versions = this.parentElement.nextElementSibling.childNodes
        for (var j = 0; j < versions.length; j++) {
          if (versions[j].className === 'version hidden' || versions[j].className === 'version hidden is-latest') {
            versions[j].style.display = 'block'
          }
        }
      })
    }
    for (var l = 0; l < seeLessButtons.length; l++) {
      seeLessButtons[l].addEventListener('click', function (e) {
        var seeMoreButton = this.previousElementSibling
        seeMoreButton.style.display = 'block'
        this.style.display = 'none'
        var versions = this.parentElement.nextElementSibling.childNodes
        for (var t = 0; t < versions.length; t++) {
          if (versions[t].className === 'version hidden' || versions[t].className === 'version hidden is-latest') {
            versions[t].style.display = 'none'
          }
        }
      })
    }
  }
})()
