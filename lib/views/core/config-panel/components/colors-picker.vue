<script>
import colorInput from './color-input'
import { Debounce } from '../../../../vendor/debounce'
export default {
  name: 'colors-picker',
  components: {
    colorInput
  },
  props: {
    value: {
      type: Array,
      default: () => []
    },
    number: {
      type: Number,
      default: -1
    }
  },
  data () {
    return {
      innerColors: []
    }
  },
  render (h) {
    // todo 改进：使用同一个 ColorPicker 实例来简化操作，提升性能并解决遮挡问题
    const colors = this.innerColors
    const isFree = this.isFree
    const createColors = () => {
      const children = colors.map((color, index) => {
        const colorPicker = [
          h(
            'color-input',
            {
              props: {
                value: colors[index]
              },
              on: {
                'input': color => {
                  this.$set(colors, index, color)
                }
              }
            }
          )
        ]
        if (isFree) colorPicker.push(h(
          'div',
          {
            'class': 'delete-color',
            on: {
              click: () => colors.splice(index, 1)
            }
          },
          '-'
        ))
        return h(
          'div',
          {
            'class': 'color-picker'
          },
          colorPicker
        )
      })

      isFree && children.push(h(
        'div',
        {
          'class': 'add-color',
          on: {
            click: () => this.addColor()
          }
        },
        '+'
      ))

      return children
    }

    return h(
      'div',
      {
        'class': 'colors-picker color-picker-wrapper'
      },
      createColors()
    )
  },
  methods: {
    addColor (color) {
      this.innerColors.push(color || '#2D8CF0')
    },
    updateColors: Debounce(function (value) {
      this.$emit('input', value)
    }, 200)
  },
  computed: {
    isFree () {
      return this.number === -1
    }
  },
  watch: {
    innerColors: {
      handler: function (value) {
        if (JSON.stringify(value) === JSON.stringify(this.value)) return
        this.updateColors([...value])
      },
      deep: true
    },
    value: {
      handler: function (value) {
        if (!value || JSON.stringify(value) === JSON.stringify(this.innerColors)) return
        // console.info([...value])
        this.innerColors.splice(0)
        value.forEach(this.addColor)
      },
      immediate: true,
      deep: true
    },
    number: {
      handler: function (value) {
        if (value > -1 && this.value.length !== value) {
          const length = this.value.length
          if (length < value) {
            for (let i = value - length; i > 0; i--) {
              this.addColor()
            }
          } else if (length > value) {
            this.innerColors.splice(value)
          }
        }
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .colors-picker {
    display: flex;
    flex-wrap: wrap;
    min-height: 30px;
    margin-bottom: -5px;
    .delete-color,
    .add-color {
      width: 24px;
      height: 24px;
      font-family: monospace;
      font-size: 16px;
      color: #999;
      line-height: 22px;
      text-align: center;
      border: #dcdee2 1px solid;
      border-radius: 2px;
      background-color: #ffffff;
      transition: 0.2s;
      cursor: pointer;
      &:hover {
        background-color: #f9f9f9;
        border-color: #2d8cf0;
        color: #2d8cf0;
      }
    }
    .add-color {
      margin-bottom: 5px;
    }
    .color-picker {
      position: relative;
      margin: 0 5px 5px 0;
      &:hover {
        .delete-color {
          opacity: 1;
        }
      }
    }
    .delete-color {
      position: absolute;
      left: 1px;
      top: 1px;
      width: 9px;
      height: 9px;
      font-size: 17px;
      display: flex;
      background-color: darkred;
      border: none;
      border-radius: 50%;
      overflow: hidden;
      justify-content: center;
      align-items: center;
      opacity: 0;
      color: white;
      transition: 0.2s;
    }
    /deep/ {
      .ivu-color-picker {
        flex-grow: 0;
        flex-shrink: 0;
        .ivu-input {
          height: 18px;
          min-height: 18px;
          max-height: 18px;
          padding: 0;
          border: none;
          margin: 6px 0;
          background-color: transparent;
        }
      }
      .ivu-color-picker-input {
        padding: 3px 6px;
      }
      .ivu-color-picker .ivu-icon-ios-arrow-down {
        display: none;
      }
      .ivu-color-picker .ivu-select-dropdown {
        left: 28px !important;
      }
      .ivu-color-picker-color {
        top: 0;
        cursor: pointer;
      }
    }
  }
</style>
