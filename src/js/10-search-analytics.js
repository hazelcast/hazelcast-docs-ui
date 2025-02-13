// eslint-disable-next-line no-undef
if (Kapa) {
  // eslint-disable-next-line no-undef
  Kapa('onSearchResultsCompleted', ({ query, searchResults }) => {
    console.log('SearchResultsCompleted - query : results => ', query, searchResults)
    window.dataLayer && window.dataLayer.push('SearchResultsCompleted => query : results', query, searchResults)
  })
} else {
  console.warn('Kapa was not detected!')
}
