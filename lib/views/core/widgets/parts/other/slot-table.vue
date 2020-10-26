<script>
import styleParser from '../lib/style-parser'
import widgetMixin from '../lib/widget-mixin'
import { getInput, getSelect, getBooleanInput, getInputNumber, getColor } from '../lib/config-tools'

const template = 'head:1、工程概况分析~~4\n' +
  '本月合同数量|{{field1}}::right|本月预算金额|{{field2}}万::right\n' +
  '本月在建数量|{{field3}}::right|本月合同金额|{{field4}}万::right\n' +
  '本月结算数量|{{field5}}::right|本月结算金额|{{field6}}万::right\n' +
  'foot:合计：{{field7}}::right~~2|合计：{{field8}}万::right~~2'
// 组件参数配置
const localConfigSource = Object.freeze({
  config: {
    fields: {
      template: getInput('template', '配置模板', {
        innerType: 'textarea',
        rows: 7,
        style: 'font-family: monospace; font-size: 1em;',
        title: '模板格式说明\n先看一个示例：\n\n' + template + '\n\n1、使用回车来区分表格的行\n2、"head:" 用来标记该行为表格头部，此外可以通过 "foot:" 标记该行为表格的底部\n3、"|" 用来划分单元格\n4、"~~4" 表示跨列，后面的 "4" 表示跨四列\n5、">>2"表示跨行，后面的 "2" 表示跨两行\n6、"::right" 表示对齐，其中 "right" 表示右对齐，还支持 left/center\n7、"{{}}" 用来包裹字段名，将自动替换为数据中对应字段的值'
      }),
      border: getBooleanInput('border', '显示边框'),
      borderColor: getColor('borderColor', '边框颜色'),
      lineHeight: getInputNumber('lineHeight', '行高')
    }
  }
})

const localConfigValue = Object.freeze({
  layout: {
    font: {
      color: '#fff',
      fontSize: 16
    },
    padding: {
      detail: {
        left: 10,
        right: 10
      }
    }
  },
  config: {
    template,
    border: true,
    borderColor: '#6F6F6F',
    lineHeight: 40
  },
  api: {
    data: JSON.stringify({
      field1: 58,
      field2: 300,
      field3: 45,
      field4: 280,
      field5: 30,
      field6: 300,
      field7: 133,
      field8: 880
    }, null, 2)
  }
})

// 用于筛选预置配置项
const configParseMap ={
  layout: {
    size: {
      '$width.height.unit': true
    },
    border: true,
    padding: true,
    font: true,
    position: true,
    background: true,
    zIndex: true,
    custom: true,
    opacity: true
  },
  config: {
    template: true,
    border: true,
    borderColor: true,
    lineHeight: true
  },
  api: true,
  animation: true
}

export default {
  name: 'widget-slot-table',
  label: '插槽表格',
  mixins: [widgetMixin],
  render: function (createElement) {
    const data = this.data || {}
    const { layout } = this.config
    const { padding = {}, ...outerLayout } = layout || {}
    const { template, border, borderColor } = this.mergedConfig || {}
    if (!template) return
    const templateReplace = template.replace(/\\?\{{([^{}]+)\}}/g, function (match, name) {
      const value = data[name]
      return value !== undefined || value !== null ? value : '--'
    })
    // console.info(templateReplace, template)
    let rows = templateReplace.split('\n')
    rows = rows.filter(item => item.trim())

    const thead = []
    const tbody = []
    const tfoot = []

    rows.forEach(item => {
      if (item.indexOf('head:') === 0) {
        thead.push(item.substring(5))
        return
      }
      if (item.indexOf('foot:') === 0) {
        tfoot.push(item.substring(5))
        return
      }
      tbody.push(item)
    })

    let theadElement = null
    let tbodyElement = null
    let tfootElement = null

    if (thead.length) {
      theadElement = createElement(
        'thead',
        {
          class: 'thead'
        },
        thead.map(row => {
          const headRowCols = this.splitColumn(row)
          return createElement(
            'tr',
            [
              this.columnElement(headRowCols, createElement, true)
            ]
          )
        })
      )
    }
    if (tfoot.length) {
      tfootElement = createElement(
        'tfoot',
        {
          class: 'tfoot'
        },
        tfoot.map(row => {
          const footRowCols = this.splitColumn(row)
          return createElement(
            'tr',
            [
              this.columnElement(footRowCols, createElement)
            ]
          )
        })
      )
    }
    tbodyElement = createElement(
      'tbody',
      tbody.map(row => {
        const cols = this.splitColumn(row)
        return createElement(
          'tr',
          [
            this.columnElement(cols, createElement)
          ]
        )
      })
    )

    const {
      value: paddingValue,
      unit: paddingUnit,
      detail: paddingDetail = {}
    } = padding

    const {
      left: paddingLeft,
      leftUnit: paddingLeftUnit = '',
      right: paddingRight,
      rightUnit: paddingRightUnit = '',
      top: paddingTop,
      topUnit: paddingTopUnit = '',
      bottom: paddingBottom,
      bottomUnit: paddingBottomUnit = ''
    } = paddingDetail

    return createElement(
      'table',
      {
        style: `
          ${styleParser(outerLayout)};
          border-color: ${borderColor};
          --td-padding: ${paddingValue ? `${paddingValue}${paddingUnit}` : 'unset'};
          --td-padding-left: ${paddingLeft ? `${paddingLeft}${paddingLeftUnit || paddingUnit}` : 0};
          --td-padding-right: ${paddingRight ? `${paddingRight}${paddingRightUnit || paddingUnit}` : 0};
          --td-padding-top: ${paddingTop ? `${paddingTop}${paddingTopUnit || paddingUnit}` : 0};
          --td-padding-bottom: ${paddingBottom ? `${paddingBottom}${paddingBottomUnit || paddingUnit}` : 0};
        `,
        'class': ['widget-slot-table', 'widget-part'],
        attrs: {
          border,
          cellpadding: 0,
          cellspacing: 0
        },
        ref: 'widget'
      },
      [
        theadElement,
        tbodyElement,
        tfootElement
      ]
    )
  },
  methods: {
    columnElement (cols, h, isHead) {
      const lineHeight = this.mergedConfig.lineHeight
      return cols.map(col => {
        const { content, align, rowspan, colspan } = col
        const attrs = {}
        const style = {
          textAlign: align
        }
        if (rowspan && rowspan !== 1) attrs.rowspan = rowspan
        if (colspan && colspan !== 1) attrs.colspan = colspan
        if (lineHeight) style.lineHeight = lineHeight + 'px'
        return h(
          isHead ? 'th' : 'td',
          {
            class: 'cell',
            style,
            attrs
          },
          content
        )
      })
    },
    splitColumn (string) {
      const columns = string.split('|')
      return columns.map(col => {
        // 对齐方式
        const [alignMatch, align = 'left'] = col.match(/::(left|right|center)/) || []
        // 跨行
        const [rowspanMatch, rowspan = 1] = col.match(/>>(\d+)/) || []
        // 跨列
        const [colspanMatch, colspan = 1] = col.match(/~~(\d+)/) || []
        // 内容
        const content = col.replace(alignMatch, '').replace(rowspanMatch, '').replace(colspanMatch, '')

        return {
          content,
          align,
          rowspan,
          colspan
        }
      })
    },
  },
  computed: {
    mergedConfig () {
      if (!this.config.config) return
      const option = this.config.config
      return option
    }
  },
  created () {
    this.configSource = this.parseConfigSource(configParseMap, localConfigSource)
    this.configValue = this.parseConfigValue(configParseMap, localConfigValue)
  }
}
</script>
<style lang="scss" scoped>
  .widget-slot-table {
    .cell {
      padding: var(--td-padding);
      padding-left: var(--td-padding-left);
      padding-right: var(--td-padding-right);
      padding-top: var(--td-padding-top);
      padding-bottom: var(--td-padding-bottom);
      min-width: 80px;
    }
  }
</style>
