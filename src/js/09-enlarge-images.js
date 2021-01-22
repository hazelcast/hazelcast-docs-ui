;(function () {
  var images = document.getElementsByClassName('image')
  if (images.length > 0) {
    for (var i = 0; i < images.length; i++) {
      const img = images[i].children[0]
      const parent = images[i].parentNode.parentElement
      const modal = document.createElement('div')
      modal.className = 'modal'
      const modalClose = document.createElement('span')
      modalClose.className = 'close'
      modalClose.innerHTML = '&times;'
      const modalImage = document.createElement('img')
      modalImage.src = img.getAttribute('src')
      modalImage.className = 'modal-image'
      modal.appendChild(modalClose)
      modal.appendChild(modalImage)
      parent.appendChild(modal)
      console.log(modal)
      img.addEventListener('click', function (e) {
        e.preventDefault()
        modal.style.display = 'block'
      })
      modalClose.onclick = function () {
        modal.style.display = 'none'
      }
    }
  }
})()
