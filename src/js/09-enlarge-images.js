;(function () {
  var imgs = []
  var blocks = document.getElementsByClassName('image')
  if (blocks.length > 0) {
    for (var i = 0; i < blocks.length; i++) {
      imgs.push(blocks[i].children[0])
    }
  }
  var kroki = document.getElementsByClassName('content')
  if (kroki.length > 0) {
    for (var o = 0; o < kroki.length; o++) {
      imgs.push(kroki[o].children[0])
    }
  }

  createModal(imgs)

  function createModal (images) {
    for (var j = 0; j < images.length; j++) {
      const parent = images[j].parentNode.parentElement
      const modal = document.createElement('div')
      modal.className = 'modal'
      const modalClose = document.createElement('span')
      modalClose.className = 'close'
      modalClose.innerHTML = '&times;'
      const modalImage = document.createElement('img')
      modalImage.src = images[j].getAttribute('src')
      modalImage.className = 'modal-image'
      modal.appendChild(modalClose)
      modal.appendChild(modalImage)
      parent.appendChild(modal)
      images[j].addEventListener('click', function (e) {
        e.preventDefault()
        modal.style.display = 'block'
      })
      modalClose.onclick = function () {
        modal.style.display = 'none'
      }
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
          modal.style.display = 'none'
        }
      })
    }
  }
})()
