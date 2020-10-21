<script>
import styleParser from '../lib/style-parser'
import widgetMixin from '../lib/widget-mixin'
import { getInput, getInputNumber, getBooleanInput, getRadio } from '../lib/config-tools'

const defaultText = '又是一个阳光灿烂的中午，看了一上午的报纸，茶水也顺带喝了不少，肚子早已经咕咕作响了，今天中午吃点什么了，貌似楼下的新开张的盒饭还不错，于是我来到楼下准备买上一盒。菜色还不错，价格有6元，8元，10元，12元，20元的，像哥这样的精英管理人才，怎么着也的吃最高级的才配合身份，就在我准备购买时，一个响亮的声音响起。'

// 组件参数配置
const localConfigSource = Object.freeze({
  config: {
    fields: {
      text: getInput('text', '文本内容', { placeholder: '文本内容', innerType: 'textarea', rows: 5 }),
      row: getInputNumber('row', '文本行数'),
      hidden: getBooleanInput('hidden', '超出隐藏'),
      fontType: getRadio('fontType', '首字', ['无:null', '下沉:drop', '悬挂:hang']),
      dropCapLine: getInputNumber('dropCapLine', '下沉行数')
    }
  }
})

const localConfigValue = Object.freeze({
  layout: {
    font: {
      color: '#fff',
      size: 16,
      lineHeight: 24,
      align: 'left',
      lineHeightUnit: 'px'
    },
    padding: {
      value: 10
    }
  },
  config: {
    text: defaultText,
    row: 3,
    hidden: true,
    fontType: null,
    dropCapLine: 2
  },
  api: {
    data: ''
  }
})

// 用于筛选预置配置项
const configParseMap = Object.freeze({
  widget: true,
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
    text: true,
    row: true,
    hidden: true,
    fontType: true,
    dropCapLine: true
  },
  api: true,
  animation: true
})

export default {
  name: 'widget-multiline-text',
  label: '多行文本',
  mixins: [widgetMixin],
  render: function (createElement) {
    const { layout } = this.config
    const { text, row, hidden, fontType, dropCapLine } = this.mergedConfig
    const isHang = fontType === 'hang'
    const isDrop = fontType === 'drop'

    let lineHeight = 24
    let lineHeightUnit = 'px'
    if (layout.font) {
      lineHeight = layout.font.lineHeight
      lineHeightUnit = layout.font.lineHeightUnit
    }

    let firstWord = ''
    let restWord = text
    if (isHang) {
      firstWord = text.substring(0, 1)
      restWord = text.substring(1)
    }

    let hangStyle = {
      paddingLeft: lineHeight * dropCapLine + lineHeightUnit
    }
    let dropStyle = {
      '--fontSize': lineHeight * dropCapLine + lineHeightUnit,
      '--lineHeight': lineHeight * dropCapLine + lineHeightUnit
    }
    return createElement(
      'div',
      {
        style: styleParser(layout, this.time),
        'class': ['widget-multiline-text', 'widget-part'],
        ref: 'widget'
      },
      [
        createElement(
          'div',
          {
            style: {
              overflow: hidden ? 'hidden' : 'unset',
              textOverflow: 'ellipsis',
              display: ' -webkit-box',
              '-webkit-line-clamp': hidden ? row : 'unset',
              '-webkit-box-orient': 'vertical'
            }
          },
          [
            createElement(
              'p',
              {
                class: [isDrop ? 'multiline-text' : ''],
                style: isDrop ? dropStyle : isHang ? hangStyle : {}
              },
              [
                isHang && firstWord && createElement(
                  'span',
                  {
                    style: {
                      position: 'absolute',
                      fontSize: lineHeight * dropCapLine + lineHeightUnit,
                      marginLeft: -(lineHeight * dropCapLine) + lineHeightUnit,
                      lineHeight: lineHeight * dropCapLine + lineHeightUnit
                    }
                  },
                  firstWord
                ),
                restWord
              ]
            )
          ]
        )
      ]
    )
  },
  methods: {
    init () { }
  },
  computed: {
    mergedConfig () {
      if (!this.config.config) return false
      const option = { ...this.config.config }
      if (!option.text) option.text = defaultText
      if (this.data) {
        option.text = this.data
        this.config.config.text = this.data
      }
      return option
    }
  },
  watch: {
    'config.config.text' (value) {
      this.data = value
    }
  },
  created () {
    this.configSource = this.parseConfigSource(configParseMap, localConfigSource)
    this.configValue = this.parseConfigValue(configParseMap, localConfigValue)
  }
}
</script>
<style lang="scss" scoped>
  .multiline-text:first-letter {
    float: left;
    text-indent: 0;
    display: inline-block;
    font-size: var(--fontSize);
    line-height: var(--lineHeight);
  }
</style>
