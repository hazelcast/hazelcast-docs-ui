;(function () {
  document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded')

    function debounce (func, timeout) {
      let timer
      return function (...args) {
        clearTimeout(timer)
        timer = setTimeout(() => func.apply(this, args), timeout)
      }
    }

    const onSearchResultsCompletedHandler = ({ query, searchResults }) => {
      console.debug('GTM', ['SearchResultsCompleted', query, searchResults])
      window.dataLayer && window.dataLayer.push(['SearchResultsCompleted', query, searchResults])
    }
    const timeout = 5000

    const onSearchResultsCompletedHandlerDebounced = debounce(onSearchResultsCompletedHandler, timeout)

    if (window.Kapa) {
      // eslint-disable-next-line no-undef
      window.Kapa('onSearchResultsCompleted', onSearchResultsCompletedHandlerDebounced)
    } else {
      console.warn('Kapa was not detected!')
    }
  })
})()
