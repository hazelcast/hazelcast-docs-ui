'use strict'

module.exports = (components, { data: { root } }) => {
  return JSON.stringify(components.reduce((acc, component) => {
    if (component.versions?.length) {
      const title = component.versions?.[0].title
      const name = component.name
      const latestVersion = component.latest.displayVersion
      const versions = component.versions
        .filter(({ isHidden }) => !isHidden)
        .slice(0, root.page.attributes['last-versions-count'])
        .map(({ displayVersion }) => displayVersion)
      acc.push({ name, title, versions, latestVersion })
    }
    return acc
  }, []))
}
