
/**
 * 处理formitem的校验规则
 *
 * @param {Object} template formitem
 * @returns 规则数组
 */
export function handlerRules(template) {
	let validate = [];
	// require校验
	if (template.required && template.type !== 16) {
		// 时间段类型
		if (template.type === 6) {
			if (
				template.timeType === 'daterange' ||
				template.timeType === 'datetimerange'
			) {
				validate.push({
					type: 'array',
					len: 2,
					required: true,
					message: template.name + '不能为空',
					trigger: 'change',
					fields: {
						// todo
						0: {
							type: 'string',
							required: true,
							message: '请选择时间段'
						},
						1: {
							type: 'string',
							required: true,
							message: '请选择时间段'
						}
					}
				});
			} else if (template.multiple) {
				validate.push({
					type: 'array',
					required: true,
					message: template.name + '不能为空',
					trigger: 'change'
				});
			} else {
				// todo
				validate.push({
					type: 'string',
					required: true,
					message: template.name + '不能为空',
					trigger: 'change'
				});
			}
		}
		// 多选，多选类型的组件，数据模型为array
		else if (
			template.multiple ||
			template.type === 3 ||
			template.type === 8 ||
			template.type === 10
		) {
			validate.push({
				type: 'array',
				required: true,
				message: template.name + '不能为空',
				trigger: 'change'
			});
		}
		// 输入类型
		else if (template.type === 1 || template.type === 5) {
			validate.push({
				type: 'string',
				required: true,
				message: template.name + '不能为空',
				trigger: 'blur'
			});
		}
		// 数字文本
		else if (template.type === 0) {
			validate.push({
				type: 'number',
				required: true,
				message: template.name + '不能为空',
				trigger: 'change'
			});
		}
		// 其他默认
		else {
			let type = '';
			if (
				template.dataSourceList &&
				template.dataSourceList.length > 0
			) {
				type = typeof template.dataSourceList[0].value;
			}
			validate.push({
				type: type || 'string',
				required: true,
				message: template.name + '不能为空',
				trigger: 'change'
			});
		}
	} else {
		validate.push({
			required: false
		});
	}
	// 正则校验，一般用于输入类型
	if (template.regexList && template.regexList.length > 0) {
		template.regexList.forEach((item) => {
			let reg;
			if (typeof item.regex === 'string') {
				reg = new RegExp(item.regex);
			} else {
				reg = item.regex;
			}
			validate.push({
				type: 'string',
				pattern: reg,
				message: item.message,
				trigger: item.trigger || 'blur'
			});
		});
	}
	if (template.validator) {
		validate.push(template.validator);
	}
	return validate;
}
/**
 * @description 向上查找 components
 */
export function findComponentUpward(context, componentName, componentNames) {
	if (typeof componentName === 'string') {
		componentNames = [componentName];
	} else {
		componentNames = componentName;
	}

	let parent = context.$parent;
	let name = parent.$options.name;
	while (parent && (!name || componentNames.indexOf(name) < 0)) {
		parent = parent.$parent;
		if (parent) name = parent.$options.name;
	}
	return parent;
}

/**
 * @description 向下查找 components
 */
export function findComponentsDownward(context, componentName) {
	return context.$children.reduce((components, child) => {
		if (child.$options.name === componentName) components.push(child);
		const foundChilds = findComponentsDownward(child, componentName);
		return components.concat(foundChilds);
	}, []);
}

/**
 * @description uuid
 */
export function uuid() {
	return Math.random().toString(36).replace('0.', '')
}

import copy from 'fast-copy'

/**
 * @description 合并对象 生成一个新的对象
 */
export function configMerge(from, to) {
	const output = copy(to)
	const isArray = Array.isArray(from);
	(!isArray ? Object.keys(from) : from).forEach((key, index) => {
		const actualKey = !isArray ? key : index
		const value = from[actualKey];
		if (value && typeof value === 'object') {
			if (!output[actualKey]) {
				output[actualKey] = !Array.isArray(value) ? {...value} : [...value]
				return
			}
			output[actualKey] = configMerge(value, output[actualKey])
		} else {
			output[actualKey] = value
		}
	})
	return output
}


/**
 * @description 连字符转驼峰
 */
export function cssStyle2DomStyle(str) {
	return str.replace(/(\w*)-(\w*)/g, function ($1, $2, $3) {
		return $2 + $3[0].toUpperCase() + $3.slice(1);
	})
}

/**
 * @description 驼峰转连字符
 */
export function domStyle2CssStyle(str) {
	return str.replace(/([A-Z])/g, function ($1) {
		return '-' + $1.toLocaleLowerCase();
	});
}

/**
 * @description style对象转字符串 {background: '#fff', fontSize: '16px'} => "background: '#fff';font-size: 16px"
 */
export function styleObj2Str(styles = {}) {
	try {
		let cssStr = JSON.stringify(styles);
		cssStr = cssStr.replace(/\{|\}/g, '').replace(/,/g, ';');
		return domStyle2CssStyle(cssStr);
	} catch (error) {
		return ''
	}
}

/**
 * @description 获取url参数
 */
export function getQueryString(name) {
	let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i")
	let r = window.location.search.substr(1).match(reg)
	if (r != null) return unescape(r[2])
	return null
}
