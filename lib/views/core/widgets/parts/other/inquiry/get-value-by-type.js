const getValueByType = (value, type) => {
  type = type.toLowerCase()
  if (type === 'string') return value + ''
  if (type === 'number') return value - 0
  if (type === 'boolean') return value === 'true' || value === true ? true : false
  return value
}

export default getValueByType
