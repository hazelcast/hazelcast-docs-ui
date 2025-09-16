;(function () {
  'use strict'

  const askAIHeaderBtn = document.getElementById('askAIHeaderBtn')

  if (askAIHeaderBtn) {
    askAIHeaderBtn.addEventListener('click', (e) => {
      e.preventDefault()
      e.stopPropagation()
      window.Kapa.open()
    })
  }
})()
