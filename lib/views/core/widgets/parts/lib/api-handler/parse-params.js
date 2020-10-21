import jsonic from 'jsonic'

const parseParams = (params = {}) => {
  if (typeof params === 'string') {
    try {
      return jsonic(params.trim())
    } catch (e) { }
  }
  return params
}

export default parseParams
