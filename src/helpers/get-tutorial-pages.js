'use strict'

module.exports = ({ data: { root } }) => {
  const { contentCatalog, page } = root
  const pages = contentCatalog.findBy({ component: page.component.name, family: 'page' })
  var tutorials = []
  for (let i = 0; i < pages.length; i++) {
    if (pages[i].asciidoc.attributes['page-layout'] === 'tutorial') {
      tutorials.push(pages[i])
    }
  }
  return tutorials
}
