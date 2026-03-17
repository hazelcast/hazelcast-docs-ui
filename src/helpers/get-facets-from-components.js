'use strict'

module.exports = (components, { data: { root } }) => {
  return JSON.stringify(components.reduce((acc, component) => {
    if (component.versions?.length) {
      const title = component.versions?.[0].title
      const name = component.name
      const latestVersion = component.latest.displayVersion
      acc.push({ name, title, latestVersion })
    }
    return acc
  }, []))
}
