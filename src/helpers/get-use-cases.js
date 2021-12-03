'use strict'

module.exports = ({ data: { root } }) => {
  const { contentCatalog, page } = root
  const pages = contentCatalog.findBy({ component: page.component.name, family: 'page' })
  var guides = []
  var useCases = []
  for (let i = 0; i < pages.length; i++) {
    if (pages[i].asciidoc.attributes['page-layout'] === 'dev-guide') {
      guides.push(pages[i])
    }
  }
  for (let j = 0; j < guides.length; j++) {
    var useCase = guides[j].asciidoc.attributes['page-use-case']
    if (useCases.indexOf(useCase) === -1) {
      useCases.push(useCase)
    }
  }
  return useCases
}
