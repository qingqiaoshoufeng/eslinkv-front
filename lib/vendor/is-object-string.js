const isObjectString = input => {
    if (typeof input !== 'string') return false
    input.trim()
    const length = input.length
    return input.indexOf('[') === 0 && input.lastIndexOf(']') === length - 1 || input.indexOf('{') === 0 && input.lastIndexOf('}') === length - 1
}

export default isObjectString
