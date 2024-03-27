'use strict'

module.exports = ({ data: { root } }) => {
  const { contentCatalog, page } = root
  if (!contentCatalog) return []
  const pages = contentCatalog.findBy({ component: page.component.name, family: 'page' })
  var tutorials = []
  var categories = []
  for (let i = 0; i < pages.length; i++) {
    if (pages[i].asciidoc.attributes['page-layout'] === 'tutorial') {
      tutorials.push(pages[i])
    }
  }
  for (let i = 0; i < tutorials.length; i++) {
    var category = tutorials[i].asciidoc.attributes['page-categories']
    var categoryList = category.split(',')
    for (let j = 0; j < categoryList.length; j++) {
      var item = categoryList[j].trim()
      if (categories.indexOf(item) === -1) {
        categories.push(item)
      }
    }
  }
  return categories
}
