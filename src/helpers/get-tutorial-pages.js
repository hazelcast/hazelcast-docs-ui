'use strict'

module.exports = (product, { data: { root } }) => {
  const { contentCatalog } = root
  const pages = contentCatalog.findBy({ component: 'tutorials', family: 'page' })
  var tutorials = []
  for (let i = 0; i < pages.length; i++) {
    if (product) {
      if (pages[i].asciidoc.attributes['page-layout'] === 'tutorial' &&
        pages[i].asciidoc.attributes['page-product'] === product) {
        tutorials.push(pages[i])
      }
    } else {
      if (pages[i].asciidoc.attributes['page-layout'] === 'tutorial') {
        tutorials.push(pages[i])
      }
    }
  }
  return tutorials
}
