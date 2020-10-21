const JSONStringify = (input, indent) => {
  let cache = []
  const output = JSON.stringify(input, function (key, value) {
    if (typeof value === 'object' && value !== null) {
      if (cache.indexOf(value) !== -1) {
        // Circular reference found, discard key
        return
      }
      cache.push(value)
    }
    return value
  }, indent)
  cache = null
  return output
}

export default JSONStringify
