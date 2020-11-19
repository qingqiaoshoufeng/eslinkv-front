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
