/**
 * 生成 InputNumber 表单元素
 * @param {String} field 字段名
 * @param {String} label 字段描述
 * @param {Object} props 额外配置
 */
const getInputNumber = (field, label, props = {}) => {
    return {
        label,
        type: 'InputNumber',
        field,
        ...props
    }
}

/**
 * 生成 Input 表单元素
 * @param {String} field 字段名
 * @param {String} label 字段描述
 * @param {Object} props 额外配置
 */
const getInput = (field, label, props = {}) => {
    return {
        label,
        type: 'Input',
        field,
        ...props
    }
}

/**
 * 生成布尔值采集表单元素，即单个 CheckBox 元素
 * @param {String} field 字段名
 * @param {String} label 字段描述
 * @param {Object} props 额外配置
 */
const getBooleanInput = (field, label, props = {}) => {
    return {
        label,
        type: 'Checkbox',
        field,
        ...props
    }
}

/**
 * 生成 Select 表单元素
 * @param {String} field 字段名
 * @param {String} label 字段描述
 * @param {Array|Function} options 候选项配置，如果是函数（仅支持 promise 异步），则可通过 props 配置 valueKey/labelKey
 * @param {Object} props 额外配置
 *
 * 当 options 值为函数时，携带通过 linkField 属性指定的表单同层属性的值，以及当前选定值
 */
const getSelect = (field, label, options, props = {}) => {
    options = typeof options !== 'function' ? getOptions(options) : options
    return {
        label,
        type: 'Select',
        field,
        options,
        ...props
    }
}

/**
 * 生成 CheckBox 表单元素
 * @param {String} field 字段名
 * @param {String} label 字段描述
 * @param {Object} options 候选项配置
 * @param {Object} props 额外配置
 */
const getCheckBox = (field, label, options, props = {}) => {
    return {
        label,
        type: 'CheckboxGroup',
        field,
        options: getOptions(options, 'Checkbox'),
        ...props
    }
}

/**
 * 生成 Radio 表单元素
 * @param {String} field 字段名
 * @param {String} label 字段描述
 * @param {Object} options 候选项配置
 * @param {Object} props 额外配置
 */
const getRadio = (field, label, options, props = {}) => {
    return {
        label,
        type: 'RadioGroup',
        field,
        options: getOptions(options, 'Radio'),
        ...props
    }
}

/**
 * 生成 Slider 表单元素
 * @param {String} field 字段名
 * @param {String} label 字段描述
 * @param {Number} min 最小值
 * @param {Number} max 最大值
 * @param {Object} props 额外配置
 */
const getSlider = (field, label, min, max, props = {}) => {
    return {
        label,
        type: 'Slider',
        field,
        min,
        max,
        ...props
    }
}

/**
 * 生成后选择项列表
 * @param {Array} items 选项列表，列表元素格式支持数字、字符串、对象，字符串可通过冒号分割表示 label:value
 * @param {String} type 选项类型，Option, CheckBox, Radio
 * @param {String|Number} nullReplacer label为无的选项的替换值，如显示条目为 无，其值为 -1
 * @return {Object}
 */
const getOptions = (items = [], type = 'Option', nullReplacer = '') => {
    return {
        type,
        list: items.map(item => {
            if (typeof item === 'string') {
                const [label, v] = item.split(':')
                const value = v !== undefined ? v : label
                return {
                    value: value !== '无' ? value : nullReplacer,
                    label
                }
            }
            if (typeof item === 'number') {
                return {
                    value: item,
                    label: item
                }
            }
            return item
        })
    }
}

/**
 * 生成单位选择下拉选择表单配置项
 * @param {String} field 字段名
 * @param {String} label 字段描述
 * @param {Array} units 单位列表
 * @param {Object} props 额外配置
 * @return {Object}
 */
const getUnit = (field, label, units = ['px', 'em', 'rem', '%', 'vw', 'vh'], props = {}) => {
    return getSelect(field, label, units, { placeholder: '单位', ...props })
}

/**
 * 生成数值输入+单位选择表单配置项
 * 用于数值+单位数据采集
 * @param {String} label 字段描述
 * @param {String} field 字段名
 * @param {String} unitField 单位字段名
 * @param {Array} units 单位列表
 * @param {Object} props 额外配置
 * @return {Array}
 */
const getNumberWithUnit = (label, field, unitField, units, props = {}) => {
    return [
        {
            label,
            type: 'InputNumber',
            field,
            ...props
        },
        getUnit(unitField, '单位', units)
    ]
}

/**
 * 生成下拉选+文本输入表单配置项
 * 用于选择或自定义输入值数据采集
 * @param {String} label 字段描述
 * @param {String} field 字段名
 * @param {Array} options 候选项列表
 * @return {Array}
 */
const getSelectWithInput = (field, label, options, props = {}) => {
    return [
        getSelect(field, label, options, { placeholder: '请选择', ...props }),
        getInput(field, '自定义', { placeholder: '自定义', ...props })
    ]
}

/**
 * 生成字体选择表单配置项
 * @param {String} field 字段名
 * @return {Array}
 */
const getFontFamilyList = (field, label = '字体', props = {}) => {
    const options = ['宋体', '仿宋', '黑体', '隶书', '幼圆', 'Arial', 'sans-serif', 'monospace']
    return getSelectWithInput(field, label, options, props)
}

/**
 * 生成字重采集表单配置项
 * @param {String} field 字段名
 * @param {String} label 字段描述
 * @return {Array}
 */
const getFontWeight = (field, label = '字重', props = {}) => {
    const options = [
        'normal', 'light', 'lighter', 'bold', 'bolder', 'inherit', 'unset',
        '100', '200', '300', '400', '500', '600', '700', '800', '900', '1000'
    ]
    return getSelect(field, label, options, { placeholder: '请选择', ...props })
}

/**
 * 生成字号采集表单配置项
 * @param {String} field 字段名
 * @return {Array}
 */
const getFontSize = (field, unit, props = {}) => {
    return getNumberWithUnit('字号', field, unit, undefined, { placeholder: '大小', ...props })
}

/**
 * 生成颜色采集表单配置项
 * @param {String} field 字段名
 * @param {String} label 字段描述
 * @param {Object} props 额外配置
 * @return {Array}
 */
const getColor = (field, label = '颜色', props = {}) => {
    return {
        label,
        type: 'ColorPicker',
        field,
        alpha: true,
        ...props
    }
}

/**
 * 生成多颜色采集表单配置项
 * @param {String} field 字段名
 * @param {String} label 字段描述
 * @param {Object} props 额外配置
 * @return {Array}
 */
const getColors = (field, label = '颜色清单', props = {}) => {
    return {
        label,
        type: 'colors-picker',
        field,
        alpha: true,
        ...props
    }
}

/**
 * 生成比值采集表单配置项
 * @param {String} field 字段名
 * @param {String} label 字段描述
 * @param {Object} props 额外配置
 * @return {Array}
 */
const getRatio = (field, label = '比例', props = {}) => {
    return {
        label,
        type: 'ratio-input',
        field,
        ...props
    }
}

/**
 * 生成边框配置数据采集表单配置项
 * @param {String} label 描述
 * @param {String} width 宽度字段
 * @param {String} unit 单位字段
 * @param {String} color 颜色字段
 * @param {String} style 样式字段
 */
const getBorder = (label, width, unit, color, style, props = {}) => {
    return [
        ...getNumberWithUnit(label, width, unit, ['px', 'em', 'rem'], { placeholder: '宽度' }),
        getColor(color, '颜色', { placeholder: '颜色' }),
        getSelect(style, '样式', [
            'none', 'hidden', 'dotted', 'dashed',
            'solid', 'double', 'groove', 'ridge',
            'inset', 'outset'
        ], { placeholder: '样式', ...props })
    ]
}

/**
 * 生成背景选择器表单配置项
 * @param {String} field 字段名
 * @param {String} label 字段描述
 * @param {Object} props 额外配置
 */
const getBackground = (field, label, props = {}) => {
    return {
        type: 'backgroundPicker',
        field,
        label,
        placeholder: '选择背景',
        url: '',
        ...props
    }
}

/**
 * 生成 Canvas Style 表单配置项组
 * 参考：http://crender.jiaminghi.com/guide/style.html
 */
const getCanvasGraphStyle = () => {
    return {
        'fill.stroke.opacity': [
            getColor('fill', '图形样式', { placeholder: '填充' }),
            getColor('stroke', '图形样式', { placeholder: '描边' }),
            getSlider('opacity', '图形样式', 0, 1, { step: 0.01, placeholder: '可见度' })
        ],
        'lineWidth.lineCap.lineJoin': [
            getInputNumber('lineWidth', '线条样式', { placeholder: '宽度', min: 0 }),
            getSelect('lineCap', '线条样式', ['butt', 'round', 'square'], { placeholder: '线帽' }),
            getSelect('lineJoin', '线条样式', ['round', 'bevel', 'miter'], { placeholder: '连接' })
        ],
        'shadowBlur.shadowColor.shadowOffsetX.shadowOffsetY': [
            getInputNumber('shadowBlur', '阴影', { min: 0, placeholder: '半径' }),
            getColor('shadowColor', '阴影', { placeholder: '颜色' }),
            getInputNumber('shadowOffsetX', '阴影', { placeholder: 'X偏移' }),
            getInputNumber('shadowOffsetY', '阴影', { placeholder: 'Y偏移' })
        ],
        rotate: getSlider('rotate', '旋转角度', 0, 360),
        fontStyle: getSelect('fontStyle', '字型', ['normal', 'italic', 'oblique']),
        fontVarient: getSelectWithInput('fontVarient', '变体', ['normal', 'small-caps', 'no-common-ligatures', 'proportional-nums', 'common-ligatures', 'tabular-nums', 'slashed-zero']),
        fontWeight: getFontWeight('fontWeight'),
        fontSize: getInputNumber('fontSize', '字号', { min: 0, placeholder: '字号' }),
        fontFamily: getFontFamilyList('fontFamily'),
        textAlign: getSelect('textAlign', '对齐', ['start', 'end', 'left', 'right', 'center']),
        textBaseline: getSelect('textBaseline', '基线', ['top', 'bottom', 'middle', 'alphabetic', 'hanging'])
    }
}

/**
 * 生成动效曲线函数表单配置项
 * @param {String} field 字段名
 * @param {String} label 字段描述
 * @param {Object} props 额外配置
 */
const getAnimationCurve = (field, label, props = {}) => {
    const options = ['linear', 'easeInSine', 'easeOutSine', 'easeInOutSine', 'easeInQuad', 'easeOutQuad', 'easeInOutQuad', 'easeInCubic', 'easeOutCubic', 'easeInOutCubic', 'easeInQuart', 'easeOutQuart', 'easeInOutQuart', 'easeInQuint', 'easeOutQuint', 'easeInOutQuint', 'easeInBack', 'easeOutBack', 'easeInOutBack', 'easeInElastic', 'easeOutElastic', 'easeInOutElastic', 'easeInBounce', 'easeOutBounce', 'easeInOutBounce']
    return getSelect(field, label, options, { placeholder: '请选择', ...props })
}

/**
 * 生成按钮控件
 * @param {String} field 按钮文本
 * @param {String|Number|Object|Array|Function} payload 按钮负载，点击按钮时，事件携带的数据或触发的方法
 * @param {Object} props 额外配置
 * @param {String} groupName 按钮组名，用于多个按钮生成按钮组
 */
const getButton = (name, payload, props = {}, groupName) => {
    return {
        type: 'Button',
        name,
        payload,
        groupName,
        ...props
    }
}

/**
 * 生成选择文件控件
 * @param {String} field 字段名
 * @param {String} label 字段描述
 * @param {Object} props 额外配置
 */
const getFile = (field, label, props = {}) => {
    return {
        type: 'uploadFile',
        field,
        label,
        ...props
    }
}

/**
 * 生成不定数目配置组采集控件
 * 该功能支持通过配置一组配置清单模板，实现数组类型配置数据采集和展示功能。
 * @param {String} field 字段名
 * @param {String} label 字段描述
 * @param {Array} template 配置项模板，例：
 * [
 *   getInput('example', '示例'),
 *   getInputNumber('example2', '长度', { min: 0, max: 100 })
 * ]
 * @param {Object} props 额外配置：
 * {
 *   min: 0, // 配置组最小数目
 *   max: 100, // 配置组最大数目
 *   noHeader: false, // 是否隐藏空间头部
 *   disableSort: false, // 是否禁用配置组调序功能
 *   showCollapseButton: true, // 是否显示收起配置组按钮
 *   noAddButton: false, // 是否显示控件尾部的添加组按钮
 *   noDeleteButton: false, // 是否显示配置组右侧的删除组按钮
 *   hideWhenEmpty: false, // 当组记录数为 0 时，是否隐藏控件
 *   noHeaderAddButton: false, // 是否隐藏顶部的增加按钮
 *   noHeaderClearButton: false, // 是否隐藏顶部的清空按钮
 *   defaultCollapse: true, // 是否默认收起采集组
 *   hideItemsMoreThan: 0, // 配置组中配置项多余配置的数目时，超过数目的配置项会被折叠，设置为 0，则表示不折叠
 * }
 */
const getArrayGroup = (field, label, template, props = {}) => {
    return {
        type: 'ArrayGroup',
        template,
        field,
        label,
        ...props
    }
}

/**
 * 插入文本描述
 * @param {String} text 文本
 * @param {String} label 文本标签 [optional]
 */
const getText = (field, label, text, props = {}) => {
    return {
        field,
        type: 'plainText',
        label,
        text,
        ...props
    }
}

/**
 * 生成 图标选择 表单元素
 * @param {String} field 字段名
 * @param {String} label 字段描述
 * @param {Array|Function} options 候选项配置，如果是函数（仅支持 promise 异步），则可通过 props 配置 valueKey/labelKey
 * @param {Object} props 额外配置
 *
 */
const getIconSelect = (field, label, options, props = {}) => {
    options = typeof options !== 'function' ? getOptions(options) : options
    return {
        label,
        type: 'iconSelect',
        field,
        options,
        ...props
    }
}

/**
 * 生成数据项拖放池
 * @param {String} field 字段名
 * @param {String} label 文本标签 [optional]
 * 支持的属性
 * removeOnDragOut: 拖动到其他池子中是否移除项目，默认 true
 * showDeleteButton: 项目是否显示删除按钮，默认 false，通过删除按钮移除对象不会放回到来源池子
 * max: 可拖入的项目个数，默认不限制
 * min: 池子中保留的最小项目个数，默认不限制
 * labelKey: 标签字段
 * valueKey: 值字段，默认为 '__self'，表示整个元素为一个对象
 */
const getDragDropPond = (field, label, props = {}) => {
    return {
        type: 'dragDropPond',
        label,
        field,
        ...props
    }
}

/**
 * 生成 eCharts 图表配置项 函数配置
 * @param {String} field 字段名
 * @param {String} label 字段描述
 * @param {Array} options 可用参数
 * @param {Object} props 额外配置
 */
const getEChartsFunction = (field, label, options, props = {}) => {
    return {
        field,
        type: 'eChartsFunctionEdit',
        label,
        options,
        ...props
    }
}

export {
    getInputNumber, getSelect, getCheckBox, getRadio, getInput, getSlider, getBooleanInput,
    getOptions, getColor, getUnit, getNumberWithUnit, getSelectWithInput, getColors, getBackground,
    getFontSize, getFontFamilyList, getFontWeight, getBorder, getCanvasGraphStyle, getAnimationCurve,
    getButton, getRatio, getFile, getArrayGroup, getText, getIconSelect, getDragDropPond, getEChartsFunction
}
