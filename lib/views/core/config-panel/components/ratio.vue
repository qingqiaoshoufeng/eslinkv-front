<script>
export default {
  name: 'ratio-input',
  props: {
    value: {
      type: [Array, String, Number],
      default: () => []
    },
    symbol: {
      type: String,
      default: ':'
    },
    range: {
      type: Object,
      default: () => {
        return {
          min: 1,
          max: 'infinity'
        }
      }
    },
    hideActions: {
      type: Boolean,
      default: false
    },
    step: {
      type: Number,
      default: 1
    },
    width: {
      type: String,
      default: null
    },
    max: {
      type: Number,
      default: null
    },
    min: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      innerValue: []
    }
  },
  render (h) {
    const values = this.innerValue
    const { min, max, step, width } = this
    const createRatios = () => {
      const children = values.map((value, index) => {
        const domProps = {
          value
        }
        const ratio = [
          h(
            'div',
            {
              style: `width: ${width}; max-width: ${width};`,
              'class': 'ratio-item'
            },
            [
              h(
                'input',
                {
                  'class': 'ratio-input',
                  attrs: {
                    type: 'number',
                    tabIndex: 999 + index,
                    min, max, step,
                    ...this.range
                  },
                  domProps,
                  on: {
                    input: e => {
                      const value = e.srcElement.value
                      this.$set(values, index, value ? Number(value) : '')
                    },
                    mousemove: e => e.stopPropagation()
                  }
                }
              )
            ]
          )
        ]
        if (index) ratio.unshift(h(
          'div',
          {
            'class': 'ratio-icon'
          },
          this.symbol
        ))
        return ratio
      })
      return children
    }

    return h(
      'div',
      {
        'class': 'field-ratio-input ratio-wrapper',
        on: {
          paste: e => {
            const data = (e.clipboardData || window.clipboardData).getData('text')
            // console.info(data)
            if (/[0-9 :,-_|]/.test(data)) {
              const pasteValue = data.match(/(\d+)/g).map(item => +item)
              if (pasteValue.length === this.innerValue.length) this.innerValue = pasteValue
            }
          },
          contextmenu: e => e.stopPropagation()
        }
      },
      createRatios().concat(!this.hideActions ? h(
        'div',
        {
          class: 'ratio-actions'
        },
        [
          h(
            'div',
            {
              class: 'ratio-add',
              attrs: {
                title: '增加一位'
              },
              on: {
                click: () => {
                  this.addRatio(0)
                }
              }
            },
            '+'
          ),
          h(
            'div',
            {
              class: 'ratio-remove',
              attrs: {
                title: '减少一位'
              },
              on: {
                click: () => {
                  this.innerValue.pop()
                }
              }
            },
            '-'
          )
        ]
      ) : [])
    )
  },
  methods: {
    addRatio (ratio) {
      ratio = ratio !== undefined ? ratio : 1
      this.innerValue.push(ratio)
    }
  },
  watch: {
    innerValue: {
      handler: function (value) {
        if (this.value && value.join('-') === this.value.join('-')) return
        this.$emit('input', [...value])
      },
      deep: true
    },
    value: {
      handler: function (value) {
        if (!value) return
        if (typeof value === 'string' || typeof value === 'number') {
          value = [value]
        }
        if (value.join('-') === this.innerValue.join('-')) return
        this.innerValue.splice(0)
        value.forEach(this.addRatio)
      },
      immediate: true,
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .field-ratio-input {
    position: relative;
    display: flex;
    height: 30px;
    justify-content: flex-start;
    align-items: center;
    padding: 2px 22px 2px 2px !important;
    background-color: white;
    .ratio-icon {
      padding: 0;
      font-family: 'Courier New', Courier, monospace;
    }
    .ratio-item {
      position: relative;
      flex-grow: 1;
      flex-shrink: 1;
      max-width: 32px;
      min-width: 20px;
      &:hover {
        .delete-ratio {
          opacity: 1;
        }
      }
      input {
        width: 100%;
        height: 24px;
        border: none;
        outline: none;
        text-align: center;
        &::-webkit-inner-spin-button,
        &::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        &:focus {
          background-color: #78b9ff;
          color: white;
        }
      }
    }
    .ratio-actions {
      position: absolute;
      right: 0;
      top: 0;
      width: 20px;
      height: 100%;
      border-left: #e2e2e2 1px solid;
      transition: border-color 0.2s linear;
      user-select: none;
      .ratio-add,
      .ratio-remove {
        width: 100%;
        height: 14px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 13px;
        font-weight: bold;
        font-family: monospace;
        cursor: pointer;
        &:hover {
          background-color: #f2f2f2;
        }
      }
      .ratio-add {
        border-bottom: 1px solid #e2e2e2;
      }
    }
    &:hover {
      .ratio-actions {
        border-left-color: #57a3f3;
      }
    }
  }
</style>