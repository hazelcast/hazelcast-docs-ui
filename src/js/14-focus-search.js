;(function () {
  var search = document.getElementById('search-input')
  if (search) {
    var ctrl = false
    document.addEventListener('keydown', function (e) {
      if (e.ctrlKey || e.metaKey) {
        ctrl = true
      }
      if (ctrl) {
        if (e.key === 'k' || e.key === 'K') {
          search.focus()
          ctrl = false
        } else {
          ctrl = false
        }
      }
    })
  }
})()
