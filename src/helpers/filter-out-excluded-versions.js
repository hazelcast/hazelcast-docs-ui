'use strict'

module.exports = ({ data: { root } }) => {
  let versions = root.page.versions
  const excludedVersions = root.page.attributes['excluded-versions']
  const currentComponentName = root.page.component.name
  if (excludedVersions) {
    const excludedComponentVersions = excludedVersions.split(',').map((it) => it.trim())
    excludedComponentVersions.forEach((componentVersion) => {
      const [componentName, excludedVersionName] = componentVersion.split(':')
      if (currentComponentName === componentName) {
        versions = versions.filter(({ version }) => {
          return version !== excludedVersionName
        })
      }
    })
  }
  return versions
}
