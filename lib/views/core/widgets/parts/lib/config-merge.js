import copy from 'fast-copy'

const configMerge = function (from, to) {
    const output = copy(to)
    const isArray = Array.isArray(from);
    (!isArray ? Object.keys(from) : from).forEach((key, index) => {
        const actualKey = !isArray ? key : index
        const value = from[actualKey];
        if (value && typeof value === 'object') {
            if (!output[actualKey]) {
                output[actualKey] = !Array.isArray(value) ? { ...value } : [...value]
                return
            }
            output[actualKey] = configMerge(value, output[actualKey])
        } else {
            output[actualKey] = value
        }
    })
    return output
}

export default configMerge
