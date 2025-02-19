;(function () {
  document.addEventListener('DOMContentLoaded', () => {
    function debounce (func, timeout) {
      let timer
      return function (...args) {
        clearTimeout(timer)
        timer = setTimeout(() => func.apply(this, args), timeout)
      }
    }

    const onSearchResultsCompletedHandler = ({ query, searchResults }) => {
      const metrics = { event: 'kapa_search_results_completed', query, searchResults }
      console.debug('GTM', metrics)
      window.dataLayer.push(metrics)
    }
    const timeout = 5000

    const onSearchResultsCompletedHandlerDebounced = debounce(onSearchResultsCompletedHandler, timeout)

    if (window.Kapa) {
      if (window.dataLayer) {
        // eslint-disable-next-line no-undef
        window.Kapa('onSearchResultsCompleted', onSearchResultsCompletedHandlerDebounced)
      } else {
        console.warn('GTM is not enabled!')
      }
    } else {
      console.warn('Kapa was not detected!')
    }
  })
})()
