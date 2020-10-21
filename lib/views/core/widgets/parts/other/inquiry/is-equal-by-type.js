const isEqualByType = (left, right, type) => {
  type = type.toLowerCase()
  if (type === 'string') return left + '' === right + ''
  if (type === 'number') return left - 0 === right - 0
  if (type === 'boolean') {
    if ([true, false, 'true', 'false'].includes(left)) return left + '' === right + ''
    return false
  }
  return left === right
}

export default isEqualByType
