export default {
  data () {
    return {
      controls: {
        remove: {},
        hide: {},
        disable: {},
        clear: {},
        setValue: {},
        reset: {}
      },
      controlUpdateTimer: null
    }
  },
  methods: {
    comparator (left, compare, right) {
      switch (compare) {
        case '==':
          return left == right
        case '!=':
          return left != right
        case '<':
          return left < right
        case '>':
          return left > right
        case '<=':
          return left <= right
        case '>=':
          return left >= right
        case 'include':
          if (typeof right === 'string') {
            return right.indexOf(left) > -1
          } else if (typeof right === 'object') {
            if (Array.isArray(right)) return right.includes(left)
            return right[left] !== undefined
          } else {
            return right.toString().indexOf(left) > -1
          }
        case 'exclude':
          if (typeof right === 'string') {
            return right.indexOf(left) === -1
          } else if (typeof right === 'object') {
            if (Array.isArray(right)) return !right.includes(left)
            return right[left] === undefined
          } else {
            return right.toString().indexOf(left) === -1
          }
        case 'custom':
          return right(left)
      }
    },
    updateControl ({ field, control }) {
      if (!control) return
      const controls = this.controls
      const currentValue = this.innerValue[field]
      const update = control => {
        const { type, target, condition, setTargetValue } = control
        const { compare, value } = condition
        const compareResult = this.comparator(currentValue, compare, value)
        const result = type !== 'setValue'
          ? compareResult : compareResult
            ? typeof setTargetValue !== 'function'
              ? setTargetValue || null : setTargetValue(currentValue, value) : false
        if (typeof target === 'string') {
          controls[type][target] = result
        } else {
          target.forEach(t => {
            controls[type][t] = result
          })
        }
      }
      if (Array.isArray(control)) {
        const matchIndex = control.findIndex(ctrl => ctrl.condition.value === currentValue)
        const copyControl = [...control]
        const matchControl = matchIndex > -1 ? copyControl.splice(matchIndex, 1) : []
        copyControl.forEach(update)
        matchControl.forEach(update)
      } else {
        update(control)
      }
    },
    updateControls () {
      const controller = this.fields.filter(field => field.control)
      controller.forEach(field => {
        this.updateControl(field)
      })
    }
  },
  watch: {
    innerValue: {
      handler: 'updateControls',
      deep: true
    }
  },
  created () {
    this.updateControls()
  }
}
