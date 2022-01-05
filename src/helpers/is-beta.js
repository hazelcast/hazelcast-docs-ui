'use strict'

module.exports = (navUrl, { data: { root } }) => {
  const { contentCatalog, page } = root
  var pages = contentCatalog.navGroup
  if (!pages) {
    pages = contentCatalog.findBy({ component: page.component.name, family: 'page' })
    contentCatalog.navGroup = pages
  }
  for (let i = 0; i < pages.length; i++) {
    if (pages[i].pub.url === navUrl &&
      pages[i].asciidoc.attributes['page-beta'] === 'true') {
      return true
    }
  }
}
