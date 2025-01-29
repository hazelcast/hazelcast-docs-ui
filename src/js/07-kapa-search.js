;(function () {
  'use strict'

  const form = document.getElementById('kapa-search-form')
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault()
      console.log(e)

      // eslint-disable-next-line no-undef
      const formData = new FormData(form)
      console.log(formData)
      window.Kapa.open({
        mode: 'search',
        query: formData.get('query'),
        submit: true,
      })
    })
  }

  const btn = document.getElementById('kapa-search-btn')
  if (btn) {
    btn.addEventListener('click', () => {
      window.Kapa.open({
        mode: 'search',
        query: '',
      })
    })
  }
})()
