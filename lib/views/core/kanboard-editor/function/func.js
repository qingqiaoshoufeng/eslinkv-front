/**
 * 内置模板函数体
 */
const numberExpand = `return data.map(item => {
    item.value = item.value * 100
    return item
})`

export {
    numberExpand
}
