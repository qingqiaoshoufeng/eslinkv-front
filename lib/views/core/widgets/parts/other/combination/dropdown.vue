<script>
export default {
  name: 'dropdown',
  label: '下拉菜单',
  props: {
    textAlign: {
      type: String,
      default: 'center'
    },
    backgroundColor: {
      type: String,
      default: 'center'
    },
    activeBackgroundColor: {
      type: String,
      default: 'center'
    },
    options: {
      type: Array,
      default: () => []
    },
    value: {
      type: [String, Number],
      default: null
    }
  },
  data () {
    return {
      showOptions: false,
      output: null,
      blurTimer: null
    }
  },
  render: function (h) {
    const {
      options, output, textAlign, backgroundColor, activeBackgroundColor
    } = this

    const body = [
      h(
        'div',
        {
          'class': 'dropdown-input',
          attrs: {
            readonly: 'readonly'
          },
          on: {
            click: e => {
              this.showOptions = !this.showOptions
              e.stopPropagation()
            }
          }
        },
        this.innerLabel
      ),
      h(
        'ul',
        {
          'class': ['dropdown-options', { active: this.showOptions }],
          style: `background-color: ${backgroundColor}`
        },
        options.length ? options.map(({ value: optionValue, label }) => {
          const isSelected = optionValue === output
          return h(
            'li',
            {
              'class': ['dropdown-option', { selected: isSelected }],
              on: {
                click: () => {
                  this.output = optionValue
                  this.showOptions = false
                  this.blurTimer && clearTimeout(this.blurTimer)
                }
              }
            },
            label || optionValue
          )
        }) : [
            h(
              'li',
              {
                'class': 'dropdown-option dropdown-option-empty'
              },
              '暂无轮播小工具'
            )
          ]
      ),
      h(
        'span',
        {
          'class': ['dropdown-icon', { active: this.showOptions }]
        }
      )
    ]

    return h(
      'div',
      {
        'class': ['dropdown', `align-${textAlign}`],
        style: `background-color: ${backgroundColor}`,
        on: {
          click: e => {
            e.stopPropagation()
          },
          mousedown: e => {
            e.stopPropagation()
          },
          mouseup: e => {
            e.stopPropagation()
          }
        },
        ref: 'widget'
      },
      body
    )
  },
  computed: {
    innerLabel () {
      const selectedOption = this.options.find(option => option.value === this.output) || {}
      return selectedOption.label || selectedOption.value || ''
    }
  },
  watch: {
    output (value) {
      if (!value || this.value === value) return
      this.$emit('input', value)
    },
    value: {
      handler: function (value) {
        if (!value || this.output === value) return
        this.output = value
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .dropdown {
    position: relative;
    display: inline-flex;
    justify-content: flex-end;
    align-items: center;
    min-width: 70px;
    width: auto;
    height: 100%;
    white-space: nowrap;
    flex-grow: 0;
    vertical-align: top;
    height: 20px;
    border-radius: 5px;
    font-size: 14px;
    font-weight: normal;
    pointer-events: auto;
  }
  .dropdown-icon {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 1em 0 0;
    pointer-events: none;
    &:before {
      content: '';
      width: 0;
      height: 0;
      border: transparent 0.5em solid;
      border-top-color: currentColor;
      margin-top: 0.5em;
    }
    &.active::before {
      transform: rotate(180deg);
      margin-top: -0.5em;
    }
  }
  .dropdown-label {
    position: relative;
    padding: 0 1em;
    white-space: nowrap;
    cursor: pointer;
    &:after {
      content: '';
      position: absolute;
      right: 0px;
      top: 0;
      bottom: 0;
      margin: auto 0;
      height: 1em;
      width: 1px;
      background-color: rgba(255, 255, 255, 0.15);
    }
  }
  .select-wrapper {
    height: 100%;
    position: relative;
    flex-grow: 1;
    flex-shrink: 1;
    display: flex;
    align-items: center;
  }
  .dropdown-input {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    height: 100%;
    border: none;
    background: none;
    outline: none;
    color: inherit;
    line-height: 1;
    padding: 0 2.5em 0 0.8em;
    width: auto;
    text-align: inherit;
    cursor: pointer;
  }
  .dropdown-options {
    position: absolute;
    top: 100%;
    right: 0;
    min-width: 100%;
    list-style: none;
    padding: 0;
    height: auto;
    max-height: 300px;
    opacity: 0;
    transform: translate3d(0, -5px, 0);
    transition: transform 0.2s, opacity 0.2s;
    overflow-x: hidden;
    z-index: 2;
    pointer-events: none;
    .dropdown-option {
      display: block;
      width: 100%;
      line-height: 2;
      padding: 0 1em;
      white-space: nowrap;
      cursor: pointer;
      &:hover {
        background-color: rgba(255, 255, 255, 0.05);
      }
      &.selected {
        background-color: rgba(45, 140, 240, 0.5);
      }
    }
    &.active {
      opacity: 1;
      transform: translate3d(0, 5px, 0);
      pointer-events: auto;
    }
  }
</style>
