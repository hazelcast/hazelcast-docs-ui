'use strict'

// filter out excluded versions
const excludeComponentVersions = (targetCollection, page) => {
  if (page.attributes['excluded-versions']) {
    const excludedComponentVersions = page.attributes['excluded-versions']
      .split(',').map((it) => it.trim())
    console.debug('[DEBUG:SORT_COMPONENTS] excluding versions: ', excludedComponentVersions)
    excludedComponentVersions.forEach((componentVersion, index) => {
      const [componentName, versionName] = componentVersion.split(':')
      const component = targetCollection.find(({ name }) => name === componentName)
      if (!component) {
        console.warn(`No component found for excluded-versions[${index}] -> ${componentVersion}`)
      } else {
        component.versions = component.versions.map((nextVersion) => {
          return {
            ...nextVersion,
            isHidden: nextVersion.version === versionName,
          }
        })
      }
    })
  }
  return targetCollection
}

module.exports = (collection, property, orderSpec, { data: { root } }) => {
  if (orderSpec == null || orderSpec === '*') return Object.values(collection)
  const sourceCollection = Object.values(collection).reduce((accum, it) => accum.set(it[property], it), new Map())
  const order = orderSpec
    .split(',')
    .map((it) => it.trim())
    .filter((it) => {
      if (it.charAt() !== '!') return true
      sourceCollection.delete(it.substr(1))
    })
  const restIdx = order.indexOf('*')
  if (~restIdx) order.splice(restIdx, 1)
  let targetCollection = order.reduce((accum, key) => {
    if (sourceCollection.has(key)) {
      accum.push(sourceCollection.get(key))
      sourceCollection.delete(key)
    }
    return accum
  }, [])
  if (~restIdx) targetCollection.splice(restIdx, 0, ...sourceCollection.values())
  targetCollection = excludeComponentVersions(targetCollection, root.page)
  return targetCollection
}
