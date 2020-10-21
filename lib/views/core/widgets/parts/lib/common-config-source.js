import {
    getInputNumber, getSelect, getRadio, getInput, getBooleanInput,
    getColor, getUnit, getNumberWithUnit, getSelectWithInput, getBackground,
    getFontSize, getFontFamilyList, getFontWeight, getBorder, getCanvasGraphStyle,
    getButton, getCheckBox, getArrayGroup, getDragDropPond
} from './config-tools'

import { getProviderList, getProviderParams } from '../../../../mixins/widget-bind-manage'

const animationEnterNames = ['bounce', 'flash', 'pulse', 'rubberBand', 'shakeX', 'shakeY', 'headShake', 'swing', 'tada', 'wobble', 'jello', 'heartBeat', 'backInDown', 'backInLeft', 'backInRight', 'backInUp', 'bounceIn', 'bounceInDown', 'bounceInLeft', 'bounceInRight', 'bounceInUp', 'fadeIn', 'fadeInDown', 'fadeInDownBig', 'fadeInLeft', 'fadeInLeftBig', 'fadeInRight', 'fadeInRightBig', 'fadeInUp', 'fadeInUpBig', 'fadeInTopLeft', 'fadeInTopRight', 'fadeInBottomLeft', 'fadeInBottomRight', 'flipInX', 'flipInY', 'lightSpeedInRight', 'lightSpeedInLeft', 'rotateIn', 'rotateInDownLeft', 'rotateInDownRight', 'rotateInUpLeft', 'rotateInUpRight', 'jackInTheBox', 'rollIn', 'zoomIn', 'zoomInDown', 'zoomInLeft', 'zoomInRight', 'zoomInUp', 'slideInDown', 'slideInLeft', 'slideInRight', 'slideInUp']

const animationLeaveNames = ['backOutDown', 'backOutLeft', 'backOutRight', 'backOutUp', 'bounceOut', 'bounceOutDown', 'bounceOutLeft', 'bounceOutRight', 'bounceOutUp', 'fadeOut', 'fadeOutDown', 'fadeOutDownBig', 'fadeOutLeft', 'fadeOutLeftBig', 'fadeOutRight', 'fadeOutRightBig', 'fadeOutUp', 'fadeOutUpBig', 'fadeOutTopLeft', 'fadeOutTopRight', 'fadeOutBottomRight', 'fadeOutBottomLeft', 'flipOutX', 'flipOutY', 'lightSpeedOutRight', 'lightSpeedOutLeft', 'rotateOut', 'rotateOutDownLeft', 'rotateOutDownRight', 'rotateOutUpLeft', 'rotateOutUpRight', 'rollOut', 'zoomOut', 'zoomOutDown', 'zoomOutLeft', 'zoomOutRight', 'zoomOutUp', 'slideOutDown', 'slideOutLeft', 'slideOutRight', 'slideOutUp']

const prepend = {
    value: '',
    label: '默认'
}

const font = Object.freeze({
    groupLabel: '文本',
    groupType: 'Collapse',
    groupActive: true,
    fields: {
        size: getFontSize('size', 'unit'),
        color: getColor('color'),
        align: getRadio('align', '水平对齐', ['左对齐:left', '居中对齐:center', '右对齐:right']),
        weight: getFontWeight('weight'),
        letterSpacing: getNumberWithUnit('字符间距', 'letterSpacing', 'letterSpacingUnit', ['em', 'px', 'rem'], { placeholder: '大小' }),
        whiteSpace: getSelect('whiteSpace', '空白处理', ['nowrap', 'pre', 'pre-wrap', 'break-spaces'], { prepend }),
        family: getFontFamilyList('family'),
        lineHeight: getNumberWithUnit('行高', 'lineHeight', 'lineHeightUnit', ['无', 'px', 'em', 'rem'], { placeholder: '大小', step: 0.1 }),
        indent: getNumberWithUnit('缩进', 'indent', 'indentUnit', ['em', 'px', 'rem', '%'], { placeholder: '大小' }),
        'decorationLine.decorationColor.decorationStyle': [
            getSelect(
                'decorationLine', '修饰线',
                ['underline', 'line-through', 'overline'],
                { placeholder: '线型', prepend }
            ),
            getColor('decorationColor', '修饰线', { placeholder: '颜色' }),
            getSelect(
                'decorationStyle', '修饰线',
                ['solid', 'double', 'dotted', 'dashed', 'wavy'],
                { placeholder: '样式', prepend }
            )
        ]
    }
})

const size = Object.freeze({
    groupLabel: '尺寸',
    groupType: 'Collapse',
    groupActive: true,
    fields: {
        // 分组的表单元素
        'width.height.unit': [
            getInputNumber('width', '尺寸', { placeholder: '宽度', min: 1 }),
            getInputNumber('height', '尺寸', { placeholder: '高度', min: 1 }),
            getUnit('unit', '尺寸')
        ]
    },
    range: {
        groupLabel: '尺寸范围',
        groupType: 'Collapse',
        fields: {
            'minWidth.maxWidth': [
                getInputNumber('minWidth', '宽度', { placeholder: '最小' }),
                getInputNumber('maxWidth', '宽度', { placeholder: '最大' })
            ],
            'minHeight.maxHeight': [
                getInputNumber('minHeight', '高度', { placeholder: '最小' }),
                getInputNumber('maxHeight', '高度', { placeholder: '最大' })
            ],
            rangeUnit: getUnit('rangeUnit', '单位')
        }
    }
})

const position = Object.freeze({
    groupLabel: '定位',
    groupType: 'Collapse',
    groupActive: true,
    fields: {
        value: getSelect('value', '方式', [
            '绝对定位:absolute',
            '相对定位:relative',
            '固定定位:fixed',
            '默认定位:static',
            '粘性定位:sticky',
        ], { prepend }),
        'left.top.right.bottom.unit': [
            getInputNumber('left', '偏移', { placeholder: '左' }),
            getInputNumber('top', '偏移', { placeholder: '上' }),
            getInputNumber('right', '偏移', { placeholder: '右' }),
            getInputNumber('bottom', '偏移', { placeholder: '下' }),
            getUnit('unit', '偏移')
        ]
    }
})

const background = Object.freeze({
    groupLabel: '背景',
    groupType: 'Collapse',
    groupActive: true,
    fields: {
        color: getColor('color', '背景色'),
        url: getBackground('url', '背景图片', { params: { type: null }, mountToBody: true }),
        url2: getInput('url', '自定义背景图片', { placeholder: '输入地址' }),
        size: getSelectWithInput('size', '尺寸', ['cover', 'contain', 'auto'], { prepend }),
        position: getSelectWithInput('position', '位置', ['left', 'top', 'right', 'bottom', 'center'], { prepend }),
        repeat: getSelect('repeat', '重复', ['repeat', 'no-repeat', 'repeat-x', 'repeat-y', 'space', 'round'], { prepend }),
        'blendMode.contentBlendMode': [
            getSelect('blendMode', '叠加模式', [
                'normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten',
                'color-dodge', 'color-burn', 'hard-light', 'soft-light', 'difference',
                'exclusion', 'hue', 'saturation', 'color', 'luminosity'
            ], { placeholder: '背景叠加', prepend }),
            getSelect('contentBlendMode', '叠加模式', [
                'normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten',
                'color-dodge', 'color-burn', 'hard-light', 'soft-light', 'difference',
                'exclusion', 'hue', 'saturation', 'color', 'luminosity'
            ], { placeholder: '内容叠加', prepend })
        ]
    }
})

const border = Object.freeze({
    groupLabel: '边框',
    groupType: 'Collapse',
    groupActive: true,
    fields: {
        'width.unit.color.style': getBorder('边框', 'width', 'unit', 'color', 'style'),
        'topLeftRadius.topRightRadius.bottomRightRadius.bottomLeftRadius.radiusUnit': [
            getInputNumber('topLeftRadius', '圆角', { placeholder: '左上' }),
            getInputNumber('topRightRadius', '圆角', { placeholder: '右上' }),
            getInputNumber('bottomRightRadius', '圆角', { placeholder: '右下' }),
            getInputNumber('bottomLeftRadius', '圆角', { placeholder: '右上' }),
            getUnit('radiusUnit', '圆角')
        ]
    },
    detail: {
        groupLabel: '单边框配置',
        groupType: 'Collapse',
        fields: {
            'leftWidth.leftUnit.leftColor.leftStyle': getBorder('左边框', 'leftWidth', 'leftUnit', 'leftColor', 'leftStyle'),
            'topWidth.topUnit.topColor.topStyle': getBorder('上边框', 'topWidth', 'topUnit', 'topColor', 'topStyle'),
            'rightWidth.rightUnit.rightColor.rightStyle': getBorder('右边框', 'rightWidth', 'rightUnit', 'rightColor', 'rightStyle'),
            'bottomWidth.bottomUnit.bottomColor.bottomStyle': getBorder('下边框', 'bottomWidth', 'bottomUnit', 'bottomColor', 'bottomStyle')
        }
    }
})

const padding = Object.freeze({
    groupLabel: '内边距',
    groupType: 'Collapse',
    groupActive: true,
    fields: {
        value: getNumberWithUnit('内边距', 'value', 'unit', ['px', 'em', 'rem', '%'], { placeholder: '大小', min: 0 })
    },
    detail: {
        groupLabel: '单边距配置',
        groupType: 'Collapse',
        fields: {
            left: getNumberWithUnit('左边距', 'left', 'leftUnit', ['px', 'em', 'rem', '%'], { placeholder: '大小', min: 0 }),
            top: getNumberWithUnit('上边距', 'top', 'topUnit', ['px', 'em', 'rem', '%'], { placeholder: '大小', min: 0 }),
            right: getNumberWithUnit('右边距', 'right', 'rightUnit', ['px', 'em', 'rem', '%'], { placeholder: '大小', min: 0 }),
            bottom: getNumberWithUnit('下边距', 'bottom', 'bottomUnit', ['px', 'em', 'rem', '%'], { placeholder: '大小', min: 0 })
        }
    }
})

const margin = Object.freeze({
    groupLabel: '外边距',
    groupType: 'Collapse',
    groupActive: true,
    fields: {
        value: getNumberWithUnit('外边距', 'value', 'unit', ['px', '%', 'vw/vh'], { placeholder: '大小' })
    },
    detail: {
        groupLabel: '单边距配置',
        groupType: 'Collapse',
        fields: {
            left: getNumberWithUnit('左边距', 'left', 'leftUnit', ['px', '%', 'vw/vh'], { placeholder: '大小' }),
            top: getNumberWithUnit('上边距', 'top', 'topUnit', ['px', '%', 'vw/vh'], { placeholder: '大小' }),
            right: getNumberWithUnit('右边距', 'right', 'rightUnit', ['px', '%', 'vw/vh'], { placeholder: '大小' }),
            bottom: getNumberWithUnit('下边距', 'bottom', 'bottomUnit', ['px', '%', 'vw/vh'], { placeholder: '大小' })
        }
    }
})

/**
 * 字段关联控制文档
 * 注意关联控制仅在同一表单内兄弟字段间有效
 * 例：
 * title: getInput('title', '标题文本', {
 *   placeholder: '标题文本',
 *   // 控制同级表单字段策略
 *   control: [
 *     {
 *        // 'remove', 'hide', 'disable', 'clear', 'setValue', 'reset'
 *        type: 'setValue',
 *        // 支持同时控制多个表单字段
 *        target: ['level'],
 *        // 控制条件，此例中，当 title 字段值为"测试"时，将移除 level 字段采集域
 *        condition: {
 *          // '==', '!=', '<', '>', '<=', '>=', 'include', 'exclude'
 *          compare: '==',
 *          // 当字段触发值
 *          value: '测试'
 *        },
 *        // 当 type 为 setValue 时，可以使用 setTargetValue 属性指定要赋给目标字段的值，该属性的值可以是数字、字符串、布尔值、数组和函数
 *        // 当 setTargetValue 属性的值为函数时，接受两个 currentValue、conditionValue 两个参数
 *        // currentValue: 当前字段的时点值
 *        // conditionValue: 即 condition 属性中 value 的值
 *        setTargetValue: (currentValue, conditionValue) => {
 *          if (currentValue === '测试') return '3'
 *        }
 *      }
 *    ]
 *  }),
 *  level: getSelect('level', '标题等级', ['一级标体:1', '二级标题:2', '三级标题:3', '四级标题:4', '五级标题:5', '六级标题:6'], { defaultValue: '2' })
 */

export { font, size, position, border, margin, padding, background }

/**
 * 小工具表单生成配置
 *
 * 保留关键字：
 *
 * layout: 小工具布局样式相关配置
 *
 * config: 小工具内部图表相关配置
 *
 * api: 小工具数据源配置
 *
 * groupLabel: 节点标签名。
 *
 * groupType: 节点类型，支持 Tabs/Collapse。
 *
 * groupActive: 节点激活状态（页签选中或折叠面板展开），对于 Tabs 节点类型来说，同一层级仅允许一个节点元素设置为 true; Collapse 节点类型则可设置多个。
 *
 * groupHelp: 节点所包含的配置项目对应的文档：{ url: '文档链接', title: '文档标题' }
 *
 * fields: 特殊节点，表示当前配置节点下的直接表单元素的集合。解析后，fields 类型为 Array;
 *
 * ! 值得注意的点：
 * ! 1. fields 节点仅表示对配置节点下直接表单元素的组织，在通过键链查找表单数据属性时须忽略 fields 键，例如 layout.size.width。
 * ! 2. fields 节点中形如 width.height.unit、minWidth.maxWidth 的键名，表示对表单元素分组的引用，可用于配置项过滤，无其他实际意义；在用作过滤条件时，此类键名须增加 $ 前缀。
 * ! 3. fields 节点子属性值为数组表示该数组内的元素会组成一个表单元素分组，包裹在 field-item-group 样式盒子中。
 * ! 4. 除了 fields，其他节点下可设置子节点，例如 layout.size.range.minWidth，它表示在 size 配置节点下追加了 range 节点。
 *
 * todo 也许不需要 fields 来表示节点下的直接表单元素，可以通过判断值类型是否包含节点关键字来确定是否为表单元素
 */
const widgetCommonConfigSource = Object.freeze({
    widget: {
        groupLabel: '组件信息',
        groupType: 'Tabs',
        groupActive: true,
        fields: {
            name: getInput('name', '组件名称'),
            id: getInput('id', '引用ID', { placeholder: '用于组件关联', disabled: true }),
            remark: getInput('remark', '备注', { innerType: 'textarea' }),
            locked: getBooleanInput('locked', '锁定组件'),
            hide: getBooleanInput('hide', '隐藏组件'),
            combinationTo: getInput('combinationTo', '组合ID', {
                disabled: true,
                placeholder: '未绑定至组合小工具'
            })
        }
    },
    layout: {
        groupLabel: '样式',
        groupType: 'Tabs',
        size,
        position,
        font,
        background,
        border,
        padding,
        margin,
        shadow: {
            groupLabel: '阴影',
            groupType: 'Collapse',
            fields: {
                color: getColor('color'),
                'offsetX.offsetY.unit': [
                    getInputNumber('offsetX', '偏移', { placeholder: 'X偏移' }),
                    getInputNumber('offsetY', '偏移', { placeholder: 'Y偏移' }),
                    getUnit('unit'),
                ],
                blurRadius: getNumberWithUnit('模糊半径', 'blurRadius', 'blurUnit', ['px', 'em', 'rem'], { placeholder: '大小' }),
                spreadRadius: getNumberWithUnit('扩展半径', 'spreadRadius', 'spreadUnit', ['px', 'em', 'rem'], { placeholder: '大小' }),
                inset: getBooleanInput('inset', '内阴影')
            }
        },
        fields: {
            zIndex: getInputNumber('zIndex', '层级', { min: -1 }),
            custom: getInput('custom', '额外样式', { innerType: 'textarea' }),
            overflow: getSelect(
                'overflow', '内容超出',
                ['可见:visible', '隐藏:hidden', '滚动条:scroll', '自动:auto', '从容器继承:inherit'],
                { prepend }
            ),
            opacity: getInputNumber('opacity', '可见度', { step: 0.01, min: 0, max: 1 }),
            pointerEvents: getBooleanInput('pointerEvents', '响应鼠标')
        }
    },
    config: {
        groupLabel: '组件配置',
        groupType: 'Tabs',
        fields: {},
        option: {
            groupLabel: '组件参数',
            groupType: 'Collapse',
            groupActive: true,
            style: {
                groupLabel: '组件图形样式配置',
                groupType: 'Collapse',
                fields: {
                    ...getCanvasGraphStyle()
                }
            }
        }
    },
    api: {
        groupLabel: '数据源',
        groupType: 'Tabs',
        groupHelp: {
            url: 'http://zentao.eslink.cc/zentao/doc-view-4655.html',
            title: '参考文档'
        },
        fields: {
            url: getInput('url', '接口地址'),
            method: getSelect('method', '请求方式', ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], { prepend }),
            params: getInput('params', '请求参数', {
                innerType: 'textarea',
                rows: 5,
                placeholder: '支持非严格模式的JSON格式\n例：a:1,b:2\n或：{a:1,b:2}\n或：{a:some string,b:2}\n或：[{a:1,b:2}]',
                title: '支持非严格模式的JSON格式\n例：a:1,b:2\n或：{a:1,b:2}\n或：{a:some string,b:2}\n或：[{a:1,b:2}]',
                jsonStringAutoFormat: true
            }),
            path: getInput('path', '数据路径'),
            data: getInput('data', '数据测试', { placeholder: '数据测试', innerType: 'textarea', rows: 5, jsonStringAutoFormat: true })
        },
        autoFetch: {
            groupLabel: '自动刷新',
            groupType: 'Collapse',
            fields: {
                enable: getBooleanInput('enable', '启用', { defaultValue: false }),
                duration: getInputNumber('duration', '刷新间隔', {
                    placeholder: '单位毫秒。\n不建议刷新间隔小于 2000 毫秒，过于频繁的请求将造成服务器压力过大。',
                    min: 1000, step: 100, defaultValue: 5000
                })
            }
        },
        check: {
            groupLabel: '接口响应检查',
            groupType: 'Collapse',
            fields: {
                enable: getBooleanInput('enable', '开启检查'),
                key: getInput('key', '字段名'),
                value: getInput('value', '响应值'),
                type: getSelect('type', '值类型', ['String', 'Boolean', 'Number'], { prepend }),
            }
        },
        system: {
            groupLabel: '数仓接口',
            groupType: 'Collapse',
            groupHelp: {
                url: 'http://zentao.eslink.cc/zentao/doc-view-4655.html',
                title: '参考文档'
            },
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
                interface: getInput('interface', '接口地址', { defaultValue: 'chart/execute' }),
                method: getSelect('method', '请求方式', ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], { prepend, defaultValue: 'POST' }),
                path: getInput('path', '数据路径', { defaultValue: 'result.data' })
            },
            check: {
                groupLabel: '响应检查',
                groupType: 'Collapse',
                fields: {
                    enable: getBooleanInput('enable', '开启检查', { defaultValue: true }),
                    key: getInput('key', '字段名', { defaultValue: 'responseCode' }),
                    value: getInput('value', '响应值', { defaultValue: '100000' }),
                    type: getSelect('type', '值类型', ['String', 'Boolean', 'Number'], { prepend, defaultValue: 'String' })
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
        globalApiConfig: {
            groupLabel: '全局数据源绑定',
            groupType: 'Collapse',
            groupHelp: {
                url: 'http://zentao.eslink.cc/zentao/doc-view-4655.html',
                title: '参考文档'
            },
            fields: {
                enable: getBooleanInput('enable', '开启绑定'),
                variables: getDragDropPond('variables', '候选变量', { removeOnDragOut: false, labelKey: '__self', valueKey: '__self' }),
                variable: getDragDropPond('variable', '绑定变量', { showDeleteButton: true, max: 1, labelKey: '__self', valueKey: '__self' })
            }
        },
        dataShareConfig: {
            groupLabel: '数据共享',
            groupType: 'Collapse',
            fields: {
                enable: getBooleanInput('enable', '启用配置', { defaultValue: false }),
                role: getRadio('role', '共享角色', ['分享者:provider', '使用者:responder'], {
                    control: [
                        {
                            type: 'remove',
                            target: ['shareVariable', 'shareProcessedData'],
                            condition: {
                                compare: '!=',
                                value: 'provider'
                            }
                        },
                        {
                            type: 'remove',
                            target: ['shareVariables', 'useVariable'],
                            condition: {
                                compare: '!=',
                                value: 'responder'
                            }
                        }
                    ]
                }),
                shareVariable: getInput('shareVariable', '共享名称', {
                    placeholder: '将数据源以自定义的名称进行共享。',
                    title: '其他小工具可通过此处定义的名称共享该小工具的数据。\n看板内共享名称不可重复。'
                }),
                shareProcessedData: getRadio('shareProcessedData', '如何共享', ['原数据:1', '路径查找到的数据:2', '加工后的数据:3'], { defaultValue: '1' }),
                shareVariables: getDragDropPond('shareVariables', '候选共享\n名称清单', { removeOnDragOut: false, labelKey: '__self', valueKey: '__self' }),
                useVariable: getDragDropPond('useVariable', '绑定名称', { showDeleteButton: true, max: 1, labelKey: '__self', valueKey: '__self' })
            }
        },
        dimensionAndQuota: {
            groupLabel: '预定维度与指标数据',
            groupType: 'Collapse',
            groupHelp: {
                url: 'http://zentao.eslink.cc/zentao/doc-view-4655.html',
                title: '参考文档'
            },
            fields: {
                enable: getBooleanInput('enable', '启用配置', { defaultValue: false }),
                index: getInput('index', '分析索引', {
                    placeholder: '获得可供字段分析的数据索引',
                    defaultValue: 0,
                    title: '通过此处指定的索引，系统可以获取数据片段来分析有哪些字段可用作维度、指标数据字段，并生成维度指标字段候选清单。\n对于类型为数组的数据，此处一般配置为 0 即可。\n如果数据类型为对象，可留空以在当前数据中进行维度指标字段分析；或指定数据对象中的某个属性名，以便在该属性对应数据中进行分析。'
                }),
                fieldsSource: getDragDropPond('fieldsSource', '候选字段', {
                    title: '将候选字段拖入维度字段或指标字段域。',
                    removeOnDragOut: false,
                    defaultValue: []
                }),
                dimensionFields: getDragDropPond('dimensionFields', '维度字段', {
                    title: '将维度字段拖回候选字段域或拖入指标字段域。',
                    defaultValue: [],
                    showDeleteButton: true
                }),
                quotaFields: getDragDropPond('quotaFields', '指标字段', {
                    title: '将指标字段拖回候选字段域或拖入维度字段域。',
                    defaultValue: [],
                    showDeleteButton: true
                }),
                dimensions: getArrayGroup('dimensions', '维度管理', [
                    getInput('fieldName', '字段名称', { disabled: true }),
                    getInput('dimensionName', '维度命名', { defaultValue: 'name', title: '重命名字段，以简化字段名或更易识别。' }),
                ], {
                    disableSort: true,
                    noAddButton: true,
                    noDeleteButton: true,
                    noHeaderAddButton: true,
                    noHeaderClearButton: true,
                    defaultCollapse: false
                }),
                quotas: getArrayGroup('quotas', '指标管理', [
                    getInput('fieldName', '字段名称', { disabled: true }),
                    getInput('quotaName', '指标命名', { defaultValue: 'value', title: '重命名字段，以简化字段名或更易识别。' }),
                ], {
                    disableSort: true,
                    noAddButton: true,
                    noDeleteButton: true,
                    noHeaderAddButton: true,
                    noHeaderClearButton: true,
                    defaultCollapse: false
                })
            }
        },
        process: {
            groupLabel: '数据加工',
            groupType: 'Collapse',
            groupHelp: {
                url: 'http://zentao.eslink.cc/zentao/doc-view-4655.html',
                title: '参考文档'
            },
            fields: {
                enable: [
                    getBooleanInput('enable', '启用配置'),
                    getButton('配置', null, {
                        eventName: 'config-process-body',
                        placeholder: '打开配置',
                        innerType: 'primary',
                        icon: 'md-settings'
                    })
                ],
                methodBody: getInput('methodBody', '加工语句', {
                    placeholder: '数据加工表达式、函数体。\n\n接口返回的数据用 data 表示，用例：\nconsole.info(data)；\nfor (item in data) {\n  console.info(item)\n}\n\n注意：加工语句必须返回计算结果，否则小工具将不会接收到任何数据。',
                    innerType: 'textarea',
                    rows: 10,
                    disabled: true
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
            fields: {
                enable: getBooleanInput('enable', '启用关联'),
                role: getCheckBox('role', '关联角色', ['参数广播:provider', '参数响应:responder']),
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
                        getInput('responderParam', '响应参数', { placeholder: '广播参数在当前小工具中的参数映射', title: '假设广播参数新值为 data，当前小工具将携带 { 响应参数名: data } 进行数据刷新。' })
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
    },
    animation: {
        groupLabel: '入场动画',
        groupType: 'Tabs',
        fields: {
            transitionEnable: getBooleanInput('transitionEnable', '启用动画'),
            enter: getSelect('enter', '入场效果', animationEnterNames),
            // leave: getSelect('leave', '出场效果', animationLeaveNames),
            delay: getInputNumber('delay', '延时时长', { placeholder: '单位: ms', min: 0, step: 10 }),
            duration: getInputNumber('duration', '动画时长', { placeholder: '单位: ms', min: 0, step: 10 })
        }
    }
})

export default widgetCommonConfigSource
