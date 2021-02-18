/**
 * 解析键名按查找路径拼接字符串到对象嵌套结构
 * @param {String} path 键名字符串
 * @param {*} value 终点值
 * @param {Object} originObject 原始对象
 * @param {String} splitString 分割字符，默认为 英文点号 '.'
 * @return {Object}
 */
const parsePathToObject = (path, value, originObject = {}, splitString = '.') => {
  const keys = path.split(splitString)
  const checkedKeys = []
  while (keys.length) {
    const key = keys.shift()
    let current = originObject
    checkedKeys.forEach(checkedKey => {
      current = current[checkedKey]
    })
    if (keys.length) {
      if (!current[key]) current[key] = {}
      checkedKeys.push(key)
    } else {
      current[key] = value
    }
  }
  return originObject
}

export default parsePathToObject
