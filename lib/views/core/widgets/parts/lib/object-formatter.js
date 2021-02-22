import copy from 'fast-copy'

/*
* 移除配置中值为 null, 空的 属性
* */
const deleteObjectKey = function (object) {
  const output = copy(object)
  Object.keys(output).forEach(key => {
    const value = output[key]
    if (value && typeof value === 'object') {
      output[key] = deleteObjectKey(value)
    } else {
      if (value === null || value === '') {
        delete output[key]
      } else if (value === 'true') {
        output[key] = true
      } else if (value === 'false') {
        output[key] = false
      }
    }
  })
  return output
}

/*
 * 将 '1, 2, 3' 格试转换成 [1, 2, 3]
 * splitAttribute 可以转换的属性名
 */
// ! 此类数组型值的采集可使用 getRatio 实现
const splitAttribute = ['offset', 'padding', 'center', 'scale', 'radius', 'position', 'boundaryGap', 'symbolSize', 'symbolOffset', 'layoutCenter']
const objectFormatter = function (object) {
  const output = deleteObjectKey(object)
  Object.keys(output).forEach(key => {
    const value = output[key]
    if (value && typeof value === 'object') {
      output[key] = objectFormatter(value)
    } else {
      if (typeof value === 'string' && value.indexOf(',') > -1 && splitAttribute.indexOf(key) > -1) {
        output[key] = value.split(',').map(item => {
          return isNaN(item - 0) ? item : item - 0
        })
      } else {
        output[key] = value
      }
    }
  })
  return output
}


export default objectFormatter


