import sourceToLayout from './source-to-layout'

const arrayValueFieldType = ['CheckboxGroup', 'colors-picker', 'ArrayGroup', 'ratio-input']
const isArrayValueField = ({ type, multiple }) => {
  return arrayValueFieldType.includes(type) || type === 'Select' && multiple
}

// 自动获取配置表单的默认数据集
const generateResultSet = ({ Tabs, Collapse, fields }) => {
  const result = {}
  if (Tabs) {
    // console.info('Tabs', Tabs)
    Tabs.forEach(({ group, value }) => {
      result[group] = generateResultSet(value)
    })
  }
  if (Collapse) {
    // console.info('Collapse', Collapse)
    Collapse.forEach(({ group, value }) => {
      result[group] = generateResultSet(value)
    })
  }
  if (fields) {
    // console.info('fields', fields)
    fields.forEach(field => {
      // 组合采集字段
      const isGroupFields = Array.isArray(field)
      if (isGroupFields) {
        field.forEach(item => {
          const { field, defaultValue, ...otherProps } = item
          result[field] = defaultValue || (!isArrayValueField(otherProps) ? '' : [])
        })
        return
      }
      // 支持嵌套的配置面板
      const groupType = field.groupType
      const isConfigPanel = groupType && (groupType === 'Collapse' || groupType === 'Tabs')
      if (isConfigPanel) {
        const { group } = field
        Object.assign(result, generateResultSet(sourceToLayout({ [group]: field })))
        return
      }
      // 支持普通单一的字段采集
      const { field: fieldName, defaultValue, ...otherProps } = field
      result[fieldName] = defaultValue || (!isArrayValueField(otherProps) ? undefined : [])
    })
  }
  return result
}

export default generateResultSet
