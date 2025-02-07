// eslint-disable-next-line no-undef
if (Kapa) {
  // eslint-disable-next-line no-undef
  Kapa('onSearchResultsCompleted', ({ query, searchResult }) => {
    console.log('SearchResultsCompleted => query : results', query, searchResult)
    window.dataLayer && window.dataLayer.push('SearchResultsCompleted => query : results', query, searchResult)
  })

  // eslint-disable-next-line no-undef
  Kapa('onSearchResultClick', ({ query, searchResult, rank }) => {
    console.log('SearchResultClick => query : results : rank', query, searchResult, rank)
    window.dataLayer && window.dataLayer.push('SearchResultClick => query : results : rank', query, searchResult, rank)
  })
} else {
  console.warn('Kapa was not detected!')
}
