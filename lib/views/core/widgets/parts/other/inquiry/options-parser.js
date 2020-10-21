import isObjectString from '../../../../../../vendor/is-object-string'
import jsonic from 'jsonic'

const optionsParser = options => {
  if (isObjectString(options)) return jsonic(options.trim())
  return options.split(',').map(item => {
    const [label, value] = item.split(':')
    return { label, value }
  })
}

export default optionsParser
