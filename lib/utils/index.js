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
