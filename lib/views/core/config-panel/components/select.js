export default {
  name: 'f-select',
  props: {
    field: {
      type: String,
      default: null,
      required: true
    },
    label: {
      type: String,
      default: null
    },
    valueKey: {
      type: String,
      default: 'value'
    },
    labelKey: {
      type: String,
      default: 'label'
    },
    options: {
      type: [Object, Function],
      default: null
    },
    multiple: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Number, Array],
      default: null
    },
    trigger: {
      type: String,
      default: 'render'
    },
    placeholder: {
      type: String,
      default: undefined
    },
    size: {
      type: Number,
      default: 4
    },
    prepend: {
      type: Object,
      default: null
    },
    form: {
      type: Object,
      default: null
    },
    linkField: {
      type: String,
      default: null
    },
    title: {
      type: String,
      default: null
    },
    styleSet: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      innerValue: '',
      dynamicOptions: []
    }
  },
  render (h) {
    let value = this.innerValue
    const { placeholder, size, title } = this
    const isDynamic = this.isOptionDynamic
    const multiple = !!this.multiple
    if (multiple && !Array.isArray(value)) value = [value]
    const isOptionSelected = optionValue => {
      return !multiple && value === optionValue || multiple && value.includes(optionValue)
    }

    const options = [...(!isDynamic ? this.options.list : this.dynamicOptions)]
    if (this.prepend) options.unshift(this.prepend)

    const children = options.map(({ value, label, ...attrs }) => {
      const domProps = {
        value
      }
      if (isOptionSelected(value)) domProps.selected = 'selected'
      return h(
        'option',
        {
        	'class': [{ selected: domProps.selected === 'selected' }],
          domProps,
          attrs
        },
        label || value
      )
    })

    const events = {}

    if (isDynamic && this.trigger) {
      this.trigger.split(',').forEach(trigger => {
        if (trigger === 'render') return
        events[trigger] = this.getOptions
      })
    }

    return h(
      'select',
      {
        'class': ['field-select', { multiple: multiple }],
        attrs: {
          multiple,
          [multiple && 'size']: size,
          placeholder,
          title
        },
        style: this.styleSet,
        domProps: {
          value
        },
        props: {
          value
        },
        on: {
          input: e => {
            if (!multiple) {
              this.innerValue = e.srcElement.value
              return
            }
            this.innerValue = Array.from(e.srcElement.selectedOptions).map(option => option.value)
          },
          ...events
        }
      },
      children
    )
  },
  methods: {
    getOptions () {
      if (!this.isOptionDynamic) return
      const { valueKey, labelKey, form = {}, linkField } = this
      const linkValue = form[linkField]
      this.options(linkValue, this.innerValue).then(result => {
        // console.info(result, labelKey, valueKey)
        this.dynamicOptions = result.map(item => {
          const { [valueKey]: value, [labelKey]: label, ...attrs } = item
          return { value, label, ...attrs }
        })
      })
    },
    isEqual (left, right) {
      const isMulti = this.multiple
      return !isMulti && left === right || isMulti && (left || []).join(' ') === (right || []).join(' ')
    }
  },
  computed: {
    isOptionDynamic () {
      return typeof this.options === 'function'
    }
  },
  watch: {
    innerValue: {
      handler: function (value) {
        if (this.isEqual(value, this.value)) return
        this.$emit('input', !this.multiple ? value : [...value])
      },
      deep: true
    },
    value: {
      handler: function (value) {
        if (!value) return
        if (this.isEqual(value, this.innerValue)) return
        this.innerValue = !this.multiple ? value : [...value]
      },
      immediate: true,
      deep: true
    }
  },
  created () {
    if (this.isOptionDynamic && this.trigger.indexOf('render') > -1) {
      this.getOptions()
    }
  }
}
