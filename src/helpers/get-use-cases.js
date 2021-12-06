'use strict'

module.exports = ({ data: { root } }) => {
  const { contentCatalog, page } = root
  const pages = contentCatalog.findBy({ component: page.component.name, family: 'page' })
  var tutorials = []
  var useCases = []
  for (let i = 0; i < pages.length; i++) {
    if (pages[i].asciidoc.attributes['page-layout'] === 'tutorial') {
      tutorials.push(pages[i])
    }
  }
  for (let j = 0; j < tutorials.length; j++) {
    var useCase = tutorials[j].asciidoc.attributes['page-use-case']
    if (useCases.indexOf(useCase) === -1) {
      useCases.push(useCase)
    }
  }
  return useCases
}
