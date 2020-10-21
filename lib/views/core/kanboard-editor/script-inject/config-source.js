import {
  getText, getInput, getRadio
} from '../../widgets/parts/lib/config-tools'

export default Object.freeze({
  script: {
    groupLabel: '全局数据源',
    groupType: 'Collapse',
    groupActive: true,
    fields: {
      name: getInput('name', '嵌入名称', { placeholder: '自定义助记名' }),
      type: getRadio('type', '嵌入方式', ['代码块:block', '脚本链接:url'], {
        defaultValue: 'block',
        control: [
          {
            type: 'hide',
            target: 'url',
            condition: {
              compare: '==',
              value: 'block'
            }
          },
          {
            type: 'hide',
            target: 'block',
            condition: {
              compare: '==',
              value: 'url'
            }
          }
        ]
      }),
      text: getText('text', '嵌入提示', '系统将以 Get 方式请求远程脚本，响应头应携带允许跨域标记。\n为保证系统和数据安全，嵌入的脚本将在沙盒环境下运行，沙盒环境下无法引用 window、top、__proto__、prototype、constructor 等高风险对象或属性。\n另外，为了使嵌入的脚本仅运行在指定的作用域内，脚本仅能引用由外部传入的顶层对象、数据。'),
      url: getInput('url', '脚本链接', {
        placeholder: '//host/pathname/demo.js',
        title: '将外部自定义脚本嵌入到看板沙盒环境中，请留意沙盒环境的诸多限制。'
      }),
      block: getInput('block', '代码块儿', {
        placeholder: 'return data.map(item => {\n  return item.value * 2\n})',
        title: '将自定义代码块儿嵌入到看板沙盒环境中，请留意沙盒环境的诸多限制。',
        innerType: 'textarea', rows: 10
      }),
      inject: getInput('inject', '注入顶层对象名称', {
        placeholder: 'data,echarts',
        title: '为嵌入的脚本注入可使用的顶层对象引用或数据。\n操作者当然可以将【嵌入提示】中的高风险对象、属性注入到嵌入的脚本中，但风险由该操作者承担。',
        innerType: 'textarea', rows: 2
      })
    }
  }
})
