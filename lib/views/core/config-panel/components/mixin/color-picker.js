export default {
  methods: {
    createColorPicker (h, field, valueSet) {
      const { type, field: fieldName, defaultValue, control, ...otherProps } = field
      let value = valueSet[fieldName]
      if (value === undefined) value = ''
      const props = {
        value,
        ...otherProps
      }
      return h(
        'color-input',
        {
          props,
          class: 'field-input',
          on: {
            'input': value => {
              if (valueSet[fieldName] === undefined) {
                this.$set(valueSet, fieldName, value)
              } else {
                valueSet[fieldName] = value
              }
            }
          }
        }
      )
    }
  }
}
