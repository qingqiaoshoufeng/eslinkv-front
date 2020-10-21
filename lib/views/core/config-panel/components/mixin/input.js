import isObjectString from '../../../../../vendor/is-object-string'

const isSimpleArray = value => {
  if (!Array.isArray(value)) return false
  const numberRegex = /^[\u4e00-\u9fa50-9a-zA-Z-_+:./]+$/
  return value.every(item => numberRegex.test(item))
}

const numberArrayNoWrap = (key, value) => {
  if (isSimpleArray(value)) {
    let simpleArrayString = JSON.stringify(value)
    simpleArrayString = simpleArrayString.replace(/,/g, ', ')
    return `<<${simpleArrayString}>>`
  }
  return value
}

const cleanJSONString = input => {
  return input.replace(/"<</g, '').replace(/>>"/g, '').replace(/\\"/g, '"')
}

export default {
  methods: {
    createInput (
      h,
      {
        label, type, field, innerType, options, jsonStringAutoFormat,
        defaultValue, control, copyable = true, clearable = true,
        ...otherProps
      },
      valueSet
    ) {
      const isTextarea = innerType === 'textarea'
      const attrs = { ...otherProps }
      let value = valueSet[field]
      if (isTextarea && jsonStringAutoFormat) {
        try {
          value = isObjectString(value)
            ? JSON.stringify(JSON.parse(value), numberArrayNoWrap, 2)
            : value && typeof value === 'object'
              ? JSON.stringify(value, numberArrayNoWrap, 2) : value != undefined ? value : ''
          value = cleanJSONString(value)
        } catch (e) { }
      }
      const domProps = {
        value
      }
      return h(
        'div',
        {
          'class': !isTextarea ? 'field-input-text' : 'field-input-textarea',
          style: {
            backgroundColor: !attrs.disabled ? 'white' : '#f5f5f5',
            position: 'relative'
          }
        },
        [
          h(
            !isTextarea ? 'input' : 'textarea',
            {
              style: {
                border: 'none',
                padding: !isTextarea ? 0 : '5px',
                width: '100%',
                height: 'auto',
                minHeight: '28px',
                outline: 'none',
                display: 'block'
              },
              attrs,
              domProps,
              on: {
                input: e => {
                  if (valueSet[field] === undefined) {
                    this.$set(valueSet, field, e.srcElement.value)
                  } else {
                    valueSet[field] = e.srcElement.value
                  }
                },
                mousemove: e => e.stopPropagation(),
                contextmenu: e => e.stopPropagation()
              }
            },
            isTextarea ? value : undefined
          ),
          value && copyable ? h(
            'Button',
            {
              'class': 'action-button copy-content',
              attrs: {
                title: '复制'
              },
              props: {
                icon: 'md-copy',
                size: 'small',
                type: 'text'
              },
              on: {
                click: e => {
                  e.stopPropagation()
                  if (!value) {
                    this.$Message.warning('无内容！')
                    return
                  }
                  if (this.$clipboard(value)) {
                    this.$Message.success('复制成功！')
                  }
                }
              }
            }
          ) : null,
          !attrs.disabled && value && clearable ? h(
            'Button',
            {
              'class': 'action-button clear-content',
              style: {
                right: copyable ? '25px' : ''
              },
              attrs: {
                title: '清空'
              },
              props: {
                icon: 'md-close',
                size: 'small',
                type: 'text'
              },
              on: {
                click: e => {
                  e.stopPropagation()
                  valueSet[field] = ''
                }
              }
            }
          ) : null
        ]
      )
    }
  }
}
