'use strict'

module.exports = (navUrl, component, { data: { root } }) => {
  const { contentCatalog /*,page*/ } = root
  const pages = contentCatalog.findBy({ component: /*page.component.name*/component, family: 'page' })
  for (let i = 0; i < pages.length; i++) {
    if (pages[i].pub.url === navUrl &&
      pages[i].asciidoc.attributes['page-enterprise'] === 'true') {
      return true
    }
  }
}
