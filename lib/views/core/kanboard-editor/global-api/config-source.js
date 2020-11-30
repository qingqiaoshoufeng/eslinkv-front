import {
  getInputNumber, getSelect, getInput, getBooleanInput,
  getButton, getArrayGroup, getCheckBox
} from '../../widgets/parts/lib/config-tools'
import { getProviderList, getProviderParams } from '../../../mixins/widget-bind-manage'

export default Object.freeze({
  api: {
    groupLabel: '全局数据源',
    groupType: 'Collapse',
    groupActive: true,
    fields: {
      variable: getInput('variable', '映射变量', {
        placeholder: '接口数据挂靠的变量名称，支持字符：a-zA-Z0-9_-',
        title: '自定义接口数据挂靠的变量名称，所有小工具数据源均可绑定到该变量。',
        pattern: '/a-zA-Z0-9_-/'
      }),
      url: getInput('url', '接口地址'),
      method: getSelect('method', '请求方式', ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], { defaultValue: 'GET' }),
      path: getInput('path', '数据路径', { defaultValue: 'data' }),
      data: getInput('data', '数据测试', { placeholder: '数据测试', innerType: 'textarea', rows: 5, jsonStringAutoFormat: true }),
      params: getInput('params', '请求参数', {
        innerType: 'textarea',
        rows: 5,
        placeholder: '支持非严格模式的JSON格式\n例：a:1,b:2\n或：{a:1,b:2}\n或：{a:some string,b:2}\n或：[{a:1,b:2}]',
        title: '支持非严格模式的JSON格式\n例：a:1,b:2\n或：{a:1,b:2}\n或：{a:some string,b:2}\n或：[{a:1,b:2}]',
        jsonStringAutoFormat: true,
        defaultValue: ''
      })
    },
    check: {
      groupLabel: '接口响应检查',
      groupType: 'Collapse',
      group: 'check',
      fields: {
        enable: getBooleanInput('enable', '开启检查', { defaultValue: true }),
        key: getInput('key', '字段名', { defaultValue: 'status' }),
        value: getInput('value', '响应值', { defaultValue: 200 }),
        type: getSelect('type', '值类型', ['String', 'Boolean', 'Number'], { defaultValue: 'Number' }),
      }
    },
    system: {
      groupLabel: '数仓接口',
      groupType: 'Collapse',
      groupHelp: {
        url: 'http://zentao.eslink.cc/zentao/doc-view-4655.html',
        title: '参考文档'
      },
      group: 'system',
      fields: {
        enable: [
          getBooleanInput('enable', '数据仓库', { placeholder: '启用', defaultValue: false }),
          getButton('配置', null, {
            eventName: 'config-database',
            placeholder: '打开配置',
            innerType: 'primary',
            icon: 'md-settings'
          })
        ],
        interface: getInput('interface', '接口名', { defaultValue: '/api/impalaByQueryId' }),
        method: getSelect('method', '请求方式', ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], { defaultValue: 'POST' }),
        path: getInput('path', '数据路径', { defaultValue: 'data' })
      },
      check: {
        groupLabel: '响应检查',
        groupType: 'Collapse',
        fields: {
          enable: getBooleanInput('enable', '开启检查', { defaultValue: true }),
          key: getInput('key', '字段名', { defaultValue: 'responseCode' }),
          value: getInput('value', '响应值', { defaultValue: '100000' }),
          type: getSelect('type', '值类型', ['String', 'Boolean', 'Number'], { defaultValue: 'String' })
        }
      },
      params: {
        groupLabel: '参数清单',
        groupType: 'Collapse',
        fields: {
          type: getInput('chartQueryType', '查询类型', { disabled: true }),
          projectId: getInput('projectId', '项目ID', { disabled: true }),
          databaseId: getInput('databaseId', '数据库ID', { disabled: true }),
          databaseName: getInput('databaseName', '数据库名', { disabled: true }),
          databaseType: getInput('databaseType', '数仓类型', { disabled: true }),
          dataType: getInput('dataType', '数据类型', { disabled: true }),
          tableId: getInput('tableId', '数据表ID', { disabled: true }),
          tableName: getInput('tableName', '数据表名', { disabled: true }),
          dataSourceId: getInput('dataSourceId', '数据源ID', { disabled: true }),
          chartCondition: getInput('chartCondition', '查询条件', { disabled: true }),
          analyseCondition: getInput('analyseCondition', '分析条件', { disabled: true }),
          dataAnalyseId: getInput('dataAnalyseId', '分析ID', { disabled: true }),
          executeSql: getInput('executeSql', '查询SQL', { disabled: true, innerType: 'textarea', rows: 5 })
        }
      }
    },
    autoFetch: {
      groupLabel: '自动刷新',
      groupType: 'Collapse',
      group: 'autoFetch',
      fields: {
        enable: getBooleanInput('enable', '启用', { defaultValue: false }),
        duration: getInputNumber('duration', '刷新间隔', {
          placeholder: '单位毫秒。\n不建议刷新间隔小于 2000 毫秒，过于频繁的请求将造成服务器压力过大。',
          min: 1000,
          step: 100,
          defaultValue: 5000
        })
      }
    },
    bind: {
      groupLabel: '组件关联',
      groupType: 'Collapse',
      groupHelp: {
        url: 'http://zentao.eslink.cc/zentao/doc-view-4655.html',
        title: '参考文档'
      },
      group: 'bind',
      fields: {
        enable: getBooleanInput('enable', '启用关联'),
        role: getCheckBox('role', '关联角色', ['参数响应:responder'], { disabled: true, defaultValue: ['responder'] }),
        refIds: getSelect('refIds', '关联ID', getProviderList, {
          multiple: 'multiple',
          placeholder: '关联小工具，可多选',
          valueKey: 'id',
          labelKey: 'name',
          trigger: 'render,mouseenter,focus',
          size: 5
        }),
        params: getArrayGroup('params', '参数响应', [
          getInput('providerId', '引用ID', { disabled: true, placeholder: '参数广播小工具ID' }),
          getArrayGroup('paramsLinks', '参数绑定', [
            getSelect('providerParam', '广播参数', getProviderParams, {
              placeholder: '参数广播小工具可绑定参数',
              title: '绑定的广播小工具中该广播参数值发生变化时，会映射到当前小工具的响应参数上，随之小工具发起刷新。',
              linkField: 'providerId',
              trigger: 'render,focus',
              valueKey: 'path',
              labelKey: 'path'
            }),
            getInput('responderParam', '响应参数', {
              placeholder: '广播参数在当前小工具中的参数映射',
              title: '假设广播参数新值为 data，当前小工具将携带 { 响应参数名: data } 进行数据刷新。'
            })
          ], {
            noHeader: true,
            disableSort: true
          })
        ], {
          noHeader: true,
          disableSort: true,
          noAddButton: true,
          noDeleteButton: true,
          hideWhenEmpty: true
        })
      }
    },
    crossFrameParamsBind: {
      groupLabel: '屏外参数绑定',
      groupType: 'Collapse',
      fields: {
        params: getArrayGroup('params', '参数清单', [
          getInput('input', '外部参数', { placeholder: '外部参数', title: '由外部程序通过通信传入的参数名称。' }),
          getInput('param', '映射参数', { placeholder: '映射参数', title: '将外部参数映射为小工具内部参数名称。' })
        ], {
          defaultCollapse: false,
          disableSort: true
        })
      }
    }
  }
})
