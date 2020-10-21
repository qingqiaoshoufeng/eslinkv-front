<script>
export default {
  name: 'icon-select',
  props: {
    options: {
      type: Object,
      default: null
    },
    value: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      innerValue: '',
      showBox: false
    }
  },
  render (h) {
    let value = this.innerValue
    const options = this.options.list

    const children = options.map(({ value }) => {
      let iconGroup = []
      if (value.indexOf('&') > -1) {
        iconGroup = value.split('&')
      } else {
        iconGroup = [value]
      }
      const iconElement = iconGroup.map(icon => {
        return h(
          'i',
          {
            class: [ icon ]
          }
        )
      })
      return h(
        'li',
        {
          on: {
            click: () => {
              this.showBox = false
              this.innerValue = value
            }
          }
        },
        [
          h(
            'span',
            {
              class: [ this.innerValue === value ? 'selected' : '' ]
            },
            iconElement
          )
        ]
      )
    })
    // 选中图标
    let selectedIcon = []
    if (value.indexOf('&') > -1) {
      selectedIcon = value.split('&')
    } else {
      selectedIcon = [value]
    }
    const selectedIconEle = selectedIcon.map(icon => {
      return h(
        'i',
        {
          class: [ icon, 'selected-icon-item' ]
        }
      )
    })

    return h(
      'div',
      {
        'class': ['field-select icon-select-wrap'],
        style: {
          position: 'relative'
        },
        props: {
          value
        }
      },
      [
        h(
          'div',
          {
            'class': ['icon-select-input'],
            on: {
              click: (e) => {
                e.stopPropagation()
                this.showBox = !this.showBox
              }
            }
          },
          [
            selectedIconEle,
            h(
              'i',
              {
                class: 'fas fa-chevron-down input-drown'
              }
            )
          ]
        ),
        this.showBox && h(
          'ul',
          {
            'class': ['icon-list']
          },
          children
        )
      ]
    )
  },
  watch: {
    innerValue: {
      handler: function (value) {
        this.$emit('input', value )
      },
      deep: true
    },
    value: {
      handler: function (value) {
        if (!value) return
        this.innerValue = value
      },
      immediate: true,
      deep: true
    }
  },
  mounted () {
    document.addEventListener('click', () => {
      this.showBox = false
    })
  }
}
</script>
<style lang="scss" scoped>
  .icon-select-input{
    background-color: #fff;
    height: 100%;
    position: relative;
    padding: 6px;
    color: #333;
    .selected-icon-item{
      font-size: 16px;
      margin-right: 8px;
    }
    .input-drown{
      position: absolute;
      right: 3px;
      top: 9px;
      font-size: 12px;
    }
  }
  .icon-list{
    margin-top: 0;
    padding: 5px;
    background-color: #fff;
    border: 1px solid #333;
    box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.1);
    position: absolute;
    left: 0;
    right: 0;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    z-index: 6;
    li{
      width: calc(100% / 3);
      padding: 6px 0;
      font-size: 16px;
      text-align: center;
      span{
        display: inline-block;
        width: calc(100% - 10px);
        border-radius: 2px;
        padding: 2px 0;
        &:hover, &.selected{
          background-color: #2d8cf0;
          cursor: pointer;
          i{
            color: #fff !important;
          }
        }
      }
      i{
        color: #333;
        &:not(:last-of-type){
          margin-right: 10px;
        }
      }
    }
  }
</style>
