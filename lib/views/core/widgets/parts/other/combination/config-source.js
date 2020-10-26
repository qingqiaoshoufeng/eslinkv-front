import {
  getInput, getSelect, getInputNumber, getArrayGroup,
  getText, getBackground, getRadio, getColor,
  getBooleanInput
} from '../../lib/config-tools'

const localConfigSource = Object.freeze({
  widget: {
    fields: {
      innerEditing: getBooleanInput('innerEditing', '子组件\n编辑中', { disabled: true })
    }
  },
  layout: {
    background: {
      fields: {
        url: getBackground('url', '背景图片', { params: { type: 2 }, mountToBody: true })
      }
    }
  },
  config: {
    fields: {
      mode: getRadio('mode', '组合模式', ['拼图模式:group', '轮播模式:slide'], {
        title: '拼图模式：多个小工具作为一个组合，在组合小工具中进行布局排列\n轮播模式：多个小工具同时充满组合小工具，以幻灯片方式进行呈现，可进行简单切换交互',
        control: {
          target: 'slide',
          type: 'remove',
          condition: {
            compare: '!=',
            value: 'slide'
          }
        }
      }),
      head: {
        groupLabel: '头部设置',
        groupType: 'Collapse',
        group: 'head',
        fields: {
          show: getBooleanInput('show', '显示头部'),
          title: getInput('title', '标题文本'),
          color: getColor('color', '背景色', { defaultValue: '#23293d' }),
          url: getBackground('url', '背景图片', { params: { type: 4 }, mountToBody: true })
        }
      },
      slide: {
        groupLabel: '轮播设置',
        groupType: 'Collapse',
        group: 'slide',
        fields: {
          switcher: {
            groupLabel: '切换按钮设置',
            groupType: 'Collapse',
            group: 'switcher',
            fields: {
              showSwitcher: getBooleanInput('showSwitcher', '显示按钮', { defaultValue: true }),
              switcherPosition: getSelect(
                'switcherPosition',
                '按钮位置',
                ['标题栏:title', '顶部:top', '底部:bottom', '左侧(垂直排列):left', '右侧(垂直排列):right'],
                {
                  defaultValue: 'title',
                  control: [
                    {
                      type: 'hide',
                      target: 'switcherMode',
                      condition: {
                        compare: '!=',
                        value: 'title'
                      }
                    },
                    {
                      type: 'setValue',
                      target: 'switcherMode',
                      condition: {
                        compare: '!=',
                        value: 'title'
                      },
                      setTargetValue: 'button'
                    }
                  ]
                }
              ),
              switcherMode: getRadio('switcherMode', '按钮模式', ['按钮:button', '下拉菜单:dropdown'], {
                defaultValue: 'button',
                control: [
                  {
                    type: 'hide',
                    target: 'showText',
                    condition: {
                      compare: '==',
                      value: 'dropdown'
                    }
                  }
                ]
              }),
              align: getRadio('align', '按钮对齐', ['靠前对齐:flex-start', '居中:center', '靠后对齐:flex-end'], { defaultValue: 'flex-end' }),
              showText: getBooleanInput('showText', '显示文本', { defaultValue: false }),
              'backgroundColor.activeBackgroundColor': [
                getColor('backgroundColor', '按钮颜色', { placeholder: '默认', defaultValue: '#3a3a3a' }),
                getColor('activeBackgroundColor', '按钮颜色', { placeholder: '激活', defaultValue: '#006597' })
              ],
              'color.activeColor': [
                getColor('color', '文本颜色', { placeholder: '默认', defaultValue: '#c9c9c9' }),
                getColor('activeColor', '文本颜色', { placeholder: '激活', defaultValue: '#06CAFF' })
              ]
            }
          },
          'effect.duration.delay': [
            getSelect('effect', '切换设置', [/* '位移切换:slide',  */'淡入:fade'], { placeholder: '效果', defaultValue: 'slide', styleSet: 'width: 80px;' }),
            getInputNumber('duration', '切换设置', { placeholder: '速度', title: '切换过程时长，单位ms', defaultValue: 300 }),
            getInputNumber('delay', '切换设置', { placeholder: '间隔', title: '自动切换间隔，单位ms', defaultValue: 5000 })
          ],
          autoplay: getBooleanInput('autoplay', '自动切换', { defaultValue: false }),
          sort: getArrayGroup('sort', '轮播顺序调整', [
            getInput('title', '名称', { disabled: true, title: '小工具名称将作为切换按钮的文本，推荐为每个子小工具设置名称。' }),
            getInput('id', 'ID', { disabled: true, title: '小工具ID' })
          ], {
            noAddButton: true,
            noDeleteButton: true,
            hideWhenEmpty: true,
            noHeaderAddButton: true,
            noHeaderClearButton: true
          }),
          currentWidgetId: getInput('currentWidgetId', '当前激活\n小工具ID', { disabled: true })
        }
      },
      children: {
        groupLabel: '子组件清单',
        groupType: 'Collapse',
        group: 'children',
        fields: {
          list: getInput('list', '子组件ID', { innerType: 'textarea', disabled: true, placeholder: '无子级小工具' })
        }
      }
    }
  }
})

const localConfigValue = Object.freeze({
  widget: {
    innerEditing: false
  },
  layout: {
    font: {
      color: '#9a9a9a'
    }
  },
  config: {
    mode: 'group',
    head: {
      show: true,
      title: '标题文本',
      color: '#23293d',
      url: ''
    },
    slide: {
      effect: 'fade',
      duration: 300,
      delay: 5000,
      autoplay: false,
      sort: [],
      currentWidgetId: '',
      switcher: {
        align: 'flex-end',
        switcherMode: 'button',
        showText: false,
        showSwitcher: true,
        switcherPosition: 'title',
        backgroundColor: '#3a3a3a',
        activeBackgroundColor: '#006597',
        color: '#c9c9c9',
        activeColor: '#06CAFF'
      }
    },
    children: {
      list: ''
    }
  }
})

// 用于筛选预置配置项
const configParseMap = {
  layout: {
    size: {
      '$width.height.unit': true
    },
    position: true,
    background: true,
    font: true,
    border: true,
    padding: true,
    zIndex: true,
    custom: true,
    opacity: true
  },
  config: {
    mode: true,
    head: true,
    slide: true,
    children: true
  },
  animation: true
}

export { localConfigSource, localConfigValue, configParseMap }
