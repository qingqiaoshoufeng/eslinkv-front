export default {
  methods: {
    createInputNumber (h, { label, type, field, innerType, options, defaultValue, control, ...otherProps }, valueSet) {
      const value = valueSet[field]
      return h(
        'input',
        {
          'class': 'field-input-number',
          attrs: {
            type: 'number',
            ...otherProps
          },
          domProps: {
            value
          },
          on: {
            input: e => {
              let value = e.srcElement.value
              value = value ? Number(value) : ''
              if (valueSet[field] === undefined) {
                this.$set(valueSet, field, value)
              } else {
                valueSet[field] = value
              }
            },
            mousemove: e => e.stopPropagation(),
            contextmenu: e => e.stopPropagation()
          }
        }
      )
    }
  }
}
