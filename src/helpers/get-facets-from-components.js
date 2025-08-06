'use strict'

module.exports = (components, page) => {
  return JSON.stringify(components.reduce((acc, component) => {
    if (component.versions?.length) {
      const title = component.versions?.[0].title
      const versions = component.versions
        .slice(0, page.attributes['last-versions-count'])
        .map(({ displayVersion }) => displayVersion)
      acc.push({ title, versions })
    }
    return acc
  }, []))
}
