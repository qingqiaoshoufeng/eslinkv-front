export default {
  methods: {
    createButton (h, field) {
      const { type, name, payload, groupName, innerType, eventName = 'button-click', ...props } = field
      const valueSet = this.innerValue
      innerType && (props.type = innerType)
      return h(
        type,
        {
          props,
          class: 'field-button',
          on: {
            click: () => {
              if (typeof payload === 'function') {
                payload({ name, ...props })
                return
              }
              this.$emit(eventName, { payload, field: { name, ...props } })
            }
          }
        },
        name
      )
    }
  }
}
