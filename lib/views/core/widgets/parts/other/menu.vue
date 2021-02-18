<script>
import styleParser from '../lib/style-parser'
import widgetMixin from '../lib/widget-mixin'
import { getInput, getSelect, getBooleanInput, getBackground, getArrayGroup, getInputNumber, getNumberWithUnit, getColor } from '../lib/config-tools'


// 组件参数配置
const localConfigSource = Object.freeze({
  layout: {
    background: {
      fields: {
        url: getBackground('url', '背景图片', { params: { type: 3 }, mountToBody: true }),
      }
    }
  },
  config: {
    fields: {
      showTitle: getBooleanInput('showTitle', '显示标题'),
      title: getInput('title', '标题文本', { placeholder: '标题文本' }),
      quantity: getInputNumber('quantity', '菜单数量', { placeholder: '支持最多显示菜单个数，剩余的菜单折叠成 dropdown 菜单' }),
      menuGap: getNumberWithUnit('菜单间距', 'menuGap', 'menuGapUnit', ['px', 'em', '%'], { min: 0, step: 1, placeholder: '菜单间距' }),
      menuWidth: getNumberWithUnit('菜单宽度', 'menuWidth', 'menuWidthUnit', ['px', 'em', '%'], { min: 0, step: 1, placeholder: '菜单宽度', title: '0 表示自动' }),
      'color.activeColor.backgroundColor.activeBackgroundColor': [
        getColor('color', '菜单配色', { placeholder: '文本' }),
        getColor('activeColor', '菜单配色', { placeholder: '选中' }),
        getColor('backgroundColor', '菜单配色', { placeholder: '背景' }),
        getColor('activeBackgroundColor', '菜单配色', { placeholder: '选中' })
      ],
      menuItems: getArrayGroup('menuItems', '菜单配置', [
        getInput('name', '菜单名称'),
        getInput('href', '链接地址'),
        getSelect('type', '链接打开方式', ['_blank', '_self', '_parent', '_top'])
      ])
    }
  }
})

const localConfigValue = Object.freeze({
  layout: {
    font: {
      color: '#a9a9a9',
      size: 16
    },
    background: {
      color: '#414141'
    },
    border: {
      topLeftRadius: 5,
      topRightRadius: 5,
      bottomRightRadius: 5,
      bottomLeftRadius: 5
    }
  },
  config: {
    showTitle: false,
    title: '',
    quantity: 2,
    menuGap: 0,
    menuGapUnit: 'px',
    menuWidth: 0,
    menuWidthUnit: 'px',
    color: '#c2c2c2',
    activeColor: '#c2c2c2',
    backgroundColor: 'transparent',
    activeBackgroundColor: 'rgba(45,140,240,0.5)',
    menuItems: [
      {
        name: '菜单1',
        href: 'http://',
        type: '_blank'
      },
      {
        name: '菜单2',
        href: 'http://',
        type: '_blank'
      }
    ]
  }
})

// 用于筛选预置配置项
const configParseMap = {
  layout: {
    size: {
      '$width.height.unit': true
    },
    font: true,
    position: true,
    background: true,
    border: true,
    padding: true,
    zIndex: true,
    custom: true,
    opacity: true
  },
  config: {
    showTitle: true,
    title: true,
    quantity: true,
    menuGap: true,
    menuGapUnit: true,
    menuWidth: true,
    menuWidthUnit: true,
    '$color.activeColor.backgroundColor.activeBackgroundColor': true,
    menuItems: true
  },
  animation: true
}

export default {
  name: 'widget-menu-list',
  label: '菜单列表',
  mixins: [widgetMixin],
  data () {
    return {
      showOptions: false
    }
  },
  render: function (h) {
    const { layout } = this.config
    const {
      showTitle, title, quantity, menuItems, topLeftRadius,
      topRightRadius, bottomRightRadius, bottomLeftRadius, radiusUnit,
      menuGap, menuGapUnit, menuWidth, menuWidthUnit,
      color, activeColor, backgroundColor, activeBackgroundColor,
      fontSize, layoutBackgroundColor
    } = this.mergedConfig

    const showDropdownMenus = quantity < menuItems.length

    const spreadMenus = [
      h(
        'ul',
        {
          'class': ['spread-menu-options'],
          style: {
            '--option-text-color': color,
            '--option-text-active-color': activeColor,
            '--option-background-color': backgroundColor,
            '--option-background-active-color': activeBackgroundColor,
            '--option-border-radius-top-left': `${topLeftRadius}${radiusUnit}`,
            '--option-border-radius-top-right': !showDropdownMenus ? `${topRightRadius}${radiusUnit}` : 0,
            '--option-border-radius-bottom-left': `${bottomLeftRadius}${radiusUnit}`,
            '--option-border-radius-bottom-right': !showDropdownMenus ? `${bottomRightRadius}${radiusUnit}` : 0
          }
        },
        menuItems.length ? menuItems.map(({ name, href, type }, index) => {
          if (!(index < quantity)) return
          const width = `${menuWidth > 0 ? menuWidth : 'auto'}${menuWidth > 0 ? menuWidthUnit : ''}`
          return h(
            'li',
            {
              'class': ['spread-menu-option', { 'fixed-width': menuWidth > 0 }],
              style: {
                marginLeft: `${index ? menuGap : 0}${menuGapUnit}`,
                width
              }
            },
            [
              h(
                'a',
                {
                  attrs: href ? {
                    href,
                    target: type
                  } : {},
                  style: {
                    fontSize
                  }
                },
                name
              )
            ]
          )
        }) : null
      )
    ]
    const dropdownMenus = [
      h(
        'div',
        {
          'class': 'dropdown-menu',
          on: {
            click: (e) => {
              e.stopPropagation()
              this.showOptions = !this.showOptions
            }
          }
        },
        [
          h(
            'span',
            '更多菜单'
          ),
          h(
            'span',
            {
              'class': 'dropdown-icon'
            }
          )
        ]
      ),
      this.showOptions && h(
        'ul',
        {
          'class': ['dropdown-menu-options'],
          style: {
            '--layout-background-color': layoutBackgroundColor,
            '--option-text-color': color,
            '--option-text-active-color': activeColor,
            '--option-background-color': backgroundColor,
            '--option-background-active-color': activeBackgroundColor
          }
        },
        menuItems.length ? menuItems.map(({ name, href, type }, index) => {
          if (index < quantity) return
          return h(
            'li',
            {
              'class': ['dropdown-menu-option'],
              on: {
                click: () => {
                  this.showOptions = false
                }
              }
            },
            [
              h(
                'a',
                {
                  attrs: href ? {
                    href,
                    target: type
                  } : {},
                  style: {
                    fontSize
                  }
                },
                name
              )
            ]
          )
        }) : null
      )
    ]

    return h(
      'div',
      {
        style: styleParser(layout, this.time),
        'class': ['widget-menu-list', 'widget-part'],
        ref: 'widget'
      },
      [
        showTitle && title && h(
          'label',
          {
            'class': 'menu-title'
          },
          title
        ),
        h(
          'div',
          {
            'class': 'spread-menu-wrapper'
          },
          spreadMenus
        ),
        showDropdownMenus && h(
          'div',
          {
            'class': 'dropdown-menu-wrapper'
          },
          dropdownMenus
        )
      ]
    )
  },
  computed: {
    mergedConfig () {
      // console.log('config')
      const { layout = {}, config = {} } = this.config
      const { topLeftRadius, topRightRadius, bottomRightRadius, bottomLeftRadius, radiusUnit } = layout.border || {}
      const { size: fontSize } = layout.font || {}
      const layoutBackgroundColor = layout.background ? layout.background.color : ''
      const {
        showTitle = false,
        title = '',
        quantity = 6,
        menuGap = 0,
        menuGapUnit = 'px',
        menuWidth = 0,
        menuWidthUnit = 'px',
        menuAlign = 'right',
        color = '#c2c2c2',
        activeColor = '#c2c2c2',
        backgroundColor = 'transparent',
        activeBackgroundColor = 'rgba(45,140,240,0.5)',
        menuItems = []
      } = config

      return {
        showTitle,
        title,
        quantity,
        menuItems,
        topLeftRadius,
        topRightRadius,
        bottomRightRadius,
        bottomLeftRadius,
        radiusUnit,
        menuGap,
        menuGapUnit,
        menuWidth,
        menuWidthUnit,
        menuAlign,
        color,
        activeColor,
        backgroundColor,
        activeBackgroundColor,
        fontSize,
        layoutBackgroundColor
      }
    }
  },
  mounted () {
    document.addEventListener('click', () => {
      this.showOptions = false
    })
  },
  created () {
    this.configValue = this.parseConfigValue(configParseMap, localConfigValue)
  }
}
</script>

<style lang="scss" scoped>
  .widget-menu-list {
    display: flex;
    align-items: center;
  }
  .menu-title {
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
  .dropdown-menu-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    flex-grow: 1;
    flex-shrink: 1;
    display: flex;
    align-items: center;
    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      margin: auto 0;
      height: 1em;
      width: 1px;
      background-color: rgba(255, 255, 255, 0.15);
    }
    .dropdown-menu {
      width: 100%;
      height: 100%;
      color: inherit;
      text-align: inherit;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      white-space: nowrap;
      .dropdown-icon {
        height: 100%;
        display: flex;
        align-items: center;
        pointer-events: none;
        margin-left: 10px;
        &:before {
          content: '';
          width: 0;
          height: 0;
          border: transparent 0.5em solid;
          border-top-color: currentColor;
          margin-top: 0.5em;
        }
      }
    }
    .dropdown-menu-options {
      position: absolute;
      top: 100%;
      left: 0;
      min-width: 100%;
      list-style: none;
      padding: 0;
      height: auto;
      max-height: 300px;
      opacity: 1;
      overflow-x: hidden;
      z-index: 2;
      margin-top: 5px;
      background-color: var(--layout-background-color);
      .dropdown-menu-option {
        display: block;
        width: 100%;
        line-height: 2.5;
        padding: 0 1em;
        white-space: nowrap;
        cursor: pointer;
        background-color: var(--option-background-color);
        a {
          color: var(--option-text-color);
          display: inline-block;
          width: 100%;
        }
        &:hover {
          a {
            color: var(--option-text-active-color);
          }
          background-color: var(--option-background-active-color);
        }
      }
    }
  }
  .spread-menu-wrapper {
    height: 100%;
    .spread-menu-options {
      width: 100%;
      height: 100%;
      list-style: none;
      display: flex;
      padding: 0;
      .spread-menu-option {
        display: inline-flex;
        height: 100%;
        background-color: var(--option-background-color);
        padding: 0 1em;
        white-space: nowrap;
        align-items: center;
        text-align: inherit;
        cursor: pointer;
        a {
          color: var(--option-text-color);
          display: inline-block;
          width: 100%;
        }
        &:hover {
          a {
            color: var(--option-text-active-color);
          }
          background-color: var(--option-background-active-color);
        }
        &:first-child {
          border-radius: var(--option-border-radius-top-left) 0 0 var(--option-border-radius-bottom-left);
        }
        &:last-child {
          border-radius: 0 var(--option-border-radius-top-right) var(--option-border-radius-bottom-right) 0;
        }
      }
    }
  }
</style>
