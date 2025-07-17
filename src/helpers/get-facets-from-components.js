'use strict'

module.exports = (components, page) => {
  const currentComponentVersion = `${page.component?.title}_${page.displayVersion}`
  return JSON.stringify(components.reduce((acc, component) => {
    if (component.versions?.length) {
      const title = component.versions?.[0].title
      acc[title] = component.versions
        .slice(0, 10)
        .reduce((versionAcc, { displayVersion }) => {
          versionAcc[displayVersion] = currentComponentVersion === `${title}_${displayVersion}`
          return versionAcc
        }, {})
    }
    return acc
  }, {}))
}
