'use strict'

module.exports = ({ data: { root } }) => {
  const { contentCatalog, page } = root
  const pages = contentCatalog.findBy({ component: page.component.name, family: 'page' })
  var guides = []
  for (let i = 0; i < pages.length; i++) {
    if (pages[i].asciidoc.attributes['page-layout'] === 'dev-guide') {
      guides.push(pages[i])
    }
  }
  return guides
}
