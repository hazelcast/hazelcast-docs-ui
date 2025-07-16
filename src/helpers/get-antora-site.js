module.exports = ({ data: { root } }) => {
  console.log('!!!root.page!!!', root.page)
  console.log('!!!root.page!!!', root.site)
  return JSON.stringify(root.site)
}
