const numberExpand = `return data.map(item => {
    item.value = item.value * 100
    return item
})`
const builtInFuncTemplate = [
  {
    name: "数值扩大100倍",
    remark: "备注数值扩大100倍",
    source: numberExpand
  }
]
export default builtInFuncTemplate
