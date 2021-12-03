'use strict'

module.exports = ({ data: { root } }) => {
  const { contentCatalog, page } = root
  const pages = contentCatalog.findBy({ component: page.component.name, family: 'page' })
  for (let i = 0; i < pages.length; i++) {
    if (pages[i].title === page.title) {
      return pages[i]
    }
  }
}
