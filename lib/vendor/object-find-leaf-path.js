const findLeafPath = object => {
  const paths = []
  Object.keys(object).forEach(key => {
    const value = object[key]
    if (!value || typeof value !== 'object') {
      paths.push(key)
    } else {
      paths.push(...findLeafPath(value).map(path => `${key}.${path}`))
    }
  })
  return paths
}

export default findLeafPath
