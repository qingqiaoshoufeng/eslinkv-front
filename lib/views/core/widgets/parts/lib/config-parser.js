const isGroupedKey = key => key.indexOf('$') > -1 || key.indexOf('.') > -1

const findTargetKey = (source, key) => {
    for (const sKey in source) {
        if (sKey !== 'fields') {
            if (sKey.indexOf(key) > -1) return sKey
            continue
        }
        return findTargetKey(source[sKey], key)
    }
}
const getSourceByGroupedKey = (source, key) => {
    if (!isGroupedKey(key)) return source[key]
    const pureKey = key.replace('$', '')
    const targetKey = findTargetKey(source, pureKey)
    if (!targetKey) return []
    const isFields = !source[targetKey]
    const keyArray = pureKey.split('.')
    return (isFields ? source.fields : source)[targetKey].filter(item => keyArray.includes(item.field))
}

const sourceParser = (source, map) => {
    const output = {}
    if (!map) return output
    Object.keys(map).forEach(key => {
        const currentMap = map[key]
        let currentSource = source[key]
        if (typeof currentMap === 'boolean' && currentMap) {
            if (currentSource) {
                output[key] = currentSource
            } else {
                const { groupLabel, groupType, groupActive, groupHelp, fields } = source
                if (!groupLabel || !groupType || !fields) return
                currentSource = getSourceByGroupedKey(fields, key)
                if (currentSource) {
                    if (!output.fields) {
                        output.fields = {}
                        output.groupLabel = groupLabel
                        output.groupType = groupType
                        output.groupActive = groupActive
                        output.groupHelp = groupHelp
                    }
                    output.fields[key] = currentSource
                }
            }
        } else {
            if (!currentSource) return
            if (!output[key]) output[key] = sourceParser(currentSource, currentMap)
            if (!output[key].groupLabel) {
                const { groupLabel, groupType, groupActive, groupHelp } = currentSource
                if (groupLabel) {
                    output[key].groupLabel = groupLabel
                    output[key].groupType = groupType
                    output[key].groupActive = groupActive
                    output[key].groupHelp = groupHelp
                }
            }
        }
    })
    return output
}

const copyValue = value => {
    if (!value || typeof value !== 'object') {
        return value
    } else {
        const isArray = Array.isArray(value)
        const output = !isArray ? {} : [];
        (!isArray ? Object.keys(value) : value).forEach((key, index) => {
            const actualKey = !isArray ? key : index
            output[actualKey] = copyValue(value[actualKey])
        })
        return output
    }
}

const copyValueConfig = (value, map) => {
    if (map && typeof map === 'boolean') {
        return copyValue(value)
    } else {
        return valueParser(value, map)
    }
}

const valueParser = (value, map) => {
    const output = {}
    Object.keys(map).forEach(key => {
        if (!isGroupedKey(key)) {
            output[key] = copyValueConfig(value[key], map[key])
        } else {
            key.replace('$', '').split('.').forEach(splitKey => {
                output[splitKey] = copyValueConfig(value[splitKey], map[key])
            })
        }
    })
    return output
}

export { sourceParser, valueParser }
