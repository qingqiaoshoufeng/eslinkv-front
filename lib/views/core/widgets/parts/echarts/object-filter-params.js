/**
 * 移除传入对象中值为 falsy (0除外)的属性
 * @param {Object} obj 原始对象
 * @param {Boolean} removeEmptyObject 是否移除值为空的数组或空对象的属性
 */
function objectFilterParams (obj, removeEmptyObject = false) {
  if (Array.isArray(obj)) {
    return arrayFilterParams(obj)
  }
  if (obj && obj.legend && obj.legend.config) {
    delete obj.legend.config
    console.info('删除 legend 循环引用')
  }
  let _newObj = {}
  Object.keys(obj).forEach(key => {
    const value = obj[key]
    if (isEmpty(value)) return
    _newObj[key] = typeof value === 'object'
      ? Array.isArray(value) ? arrayFilterParams(value) : objectFilterParams(value)
      : value

    const newKeyObj = _newObj[key]
    if (removeEmptyObject) {
      const isArray = Array.isArray(newKeyObj)
      if (isArray && !newKeyObj.length) {
        delete _newObj[key]
        return
      }
      const isObject = typeof newKeyObj === 'object'
      if (isObject && !Object.keys(newKeyObj).length) delete _newObj[key]
    }
  })
  return _newObj
}
function arrayFilterParams (arr) {
  let err = []
  arr.forEach(item => {
    if (isEmpty(item)) return
    const itemV = item && typeof item === 'object'
      ? Array.isArray(item) ? arrayFilterParams(item) : objectFilterParams(item)
      : item

    if (itemV === 0 || itemV && typeof itemV !== 'object' || typeof itemV === 'object' && Object.keys(itemV).length) {
      err.push(itemV)
    }
  })
  return err
}

function isEmpty (obj) {
  // 为空情况
  const empty_arr = ['', undefined, null]
  return (empty_arr.indexOf(obj) > -1 || obj.toString().trim() === '')
}

export default objectFilterParams


